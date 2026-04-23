import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

// ─── Schema ───────────────────────────────────────────────────────────────────
const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 3;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

function getClientIp(req: NextRequest): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const first = xForwardedFor.split(",")[0].trim();
    if (first) return first;
  }
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(ip, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - entry.count,
    resetAt: entry.resetAt,
  };
}

// ─── Route Handlers ───────────────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // 2. Validate
  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors.email?.[0] ?? "Invalid email" },
      { status: 422 }
    );
  }

  // 3. Rate limit
  const ip = getClientIp(req);
  const { allowed, remaining, resetAt } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
        },
      }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmails = (process.env.WAILIST_OWNER_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (!apiKey) {
    console.error("[waitlist] RESEND_API_KEY not configured.");
    return NextResponse.json(
      { error: "Service not configured. Please try again later." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const { email } = parsed.data;
  const timestamp = new Date().toISOString();

  // 4. Run all three in parallel: owner notification, subscriber confirmation, contact creation
  const [ownerOk, confirmOk] = await Promise.all([
    // Notify owner(s)
    ownerEmails.length > 0
      ? resend.emails
        .send({
          from: "UniPool <noreply@contact.unipool.dev>",
          to: ownerEmails,
          subject: `New Waitlist Signup: ${email}`,
          html: `
              <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
                <span style="font-size: 24px; font-weight: 900; color: #09090b; letter-spacing: -1px;">UniPool</span>
                <h2 style="font-size: 20px; font-weight: 800; color: #09090b; margin: 16px 0 8px;">
                  🎉 New Waitlist Signup
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #71717a; width: 80px;">Email</td>
                    <td style="padding: 8px 0; color: #09090b;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #71717a;">Time</td>
                    <td style="padding: 8px 0; color: #09090b;">${timestamp}</td>
                  </tr>
                </table>
              </div>
            `,
        })
        .then(({ error }) => !error)
        .catch(() => false)
      : Promise.resolve(true), // no owner email configured → don't block

    // Confirm to subscriber
    resend.emails
      .send({
        from: "UniPool <noreply@contact.unipool.dev>",
        to: email,
        subject: "You're on the UniPool waitlist! 🎉",
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
            <div style="margin-bottom: 24px;">
              <span style="font-size: 28px; font-weight: 900; color: #09090b; letter-spacing: -1px;">UniPool</span>
            </div>
            <h1 style="font-size: 26px; font-weight: 800; color: #09090b; margin: 0 0 12px;">
              You're on the list! 🎉
            </h1>
            <p style="font-size: 16px; color: #52525b; line-height: 1.6; margin: 0 0 24px;">
              Thanks for joining the UniPool waitlist. We'll email you the moment
              we launch on the <strong>Google Play Store</strong> and <strong>Apple App Store</strong>.
            </p>
            <div style="background: #f4f4f5; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #09090b;">
                While you wait — try the Android APK
              </p>
              <p style="margin: 0 0 16px; font-size: 14px; color: #71717a; line-height: 1.5;">
                The app is live and free to download right now on Android.
              </p>
              <a href="https://www.unipool.dev/downloads/unipool.apk"
                style="display: inline-block; background: #09090b; color: #fff; font-size: 14px;
                       font-weight: 700; padding: 10px 20px; border-radius: 100px; text-decoration: none;">
                Download APK
              </a>
            </div>
            <p style="font-size: 12px; color: #a1a1aa; margin: 0;">
              You received this because you signed up at unipool.dev.<br/>
              Free to use · University students only
            </p>
          </div>
        `,
      })
      .then(({ error }) => !error)
      .catch(() => false),

    resend.contacts
      .create({ email, unsubscribed: false })
      .then(({ error }) => {
        if (error) {
          // Duplicate is fine — they're already a contact
          const isDuplicate =
            error.message?.toLowerCase().includes("already exists") ||
            error.name === "validation_error";
          if (!isDuplicate) {
            console.warn("[waitlist] contacts.create error:", error);
          }
        }
        return true; // contact step never blocks overall success
      })
      .catch((err) => {
        console.warn("[waitlist] contacts.create failed:", err);
        return true; // still non-blocking
      }),
  ]);

  if (!ownerOk && !confirmOk) {
    return NextResponse.json(
      { error: "Failed to process signup. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "You're on the waitlist!", success: true },
    {
      status: 200,
      headers: {
        "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
        "X-RateLimit-Remaining": String(remaining),
        "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
      },
    }
  );
}
