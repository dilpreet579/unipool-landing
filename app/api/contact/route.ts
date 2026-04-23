import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

// ─── Zod Schema ───────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Must be a valid email address"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 characters")
    .max(20, "Phone must be at most 20 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be at most 1000 characters"),
});

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 seconds
const RATE_LIMIT_MAX = 5;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

function getClientIp(req: NextRequest): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }
  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();
  return "unknown";
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

function rateLimitHeaders(remaining: number, resetAt: number) {
  return {
    "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
  };
}

// ─── Telegram Notification ────────────────────────────────────────────────────
async function sendTelegram(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[contact] Telegram env vars not set — skipping.");
    return false;
  }

  const now = new Date();
  const timestamp = now.toISOString();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const text = [
    `📬 *New Contact Form Submission*`,
    ``,
    `*Name:* ${data.name}`,
    `*Email:* ${data.email}`,
    `*Phone:* ${data.phone}`,
    ``,
    `*Message:*`,
    data.message,
    ``,
    `🕐 *Time:* ${timestamp}`,
    `🌍 *Timezone:* ${timezone}`,
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] Telegram error:", err);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] Telegram fetch failed:", err);
    return false;
  }
}

// ─── Email Notification via Resend ────────────────────────────────────────────
async function sendEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    console.warn("[contact] Resend env vars not set — skipping.");
    return false;
  }

  // Support multiple recipients: "a@x.com, b@x.com"
  const recipients = contactEmail
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const resend = new Resend(apiKey);
  const htmlMessage = data.message.replace(/\n/g, "<br>");

  try {
    const { error } = await resend.emails.send({
      from: "UniPool Contact <onboarding@resend.dev>",
      to: recipients,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #09090b; border-bottom: 1px solid #e4e4e7; padding-bottom: 12px;">
            📬 New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717a; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #09090b;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717a;">Email</td>
              <td style="padding: 8px 0; color: #09090b;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717a;">Phone</td>
              <td style="padding: 8px 0; color: #09090b;">${data.phone}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="font-weight: bold; color: #71717a; margin-bottom: 8px;">Message</p>
            <div style="background: #f4f4f5; border-radius: 8px; padding: 16px; color: #09090b; line-height: 1.6;">
              ${htmlMessage}
            </div>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #a1a1aa;">
            Sent via UniPool contact form · ${new Date().toISOString()}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] Resend failed:", err);
    return false;
  }
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
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // 3. Rate limit
  const ip = getClientIp(req);
  const { allowed, remaining, resetAt } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later.", retryAfter: 60 },
      {
        status: 429,
        headers: rateLimitHeaders(0, resetAt),
      }
    );
  }

  // 4. Send notifications in parallel
  const { name, email, phone, message } = parsed.data;
  const [telegramOk, emailOk] = await Promise.all([
    sendTelegram({ name, email, phone, message }),
    sendEmail({ name, email, phone, message }),
  ]);

  // 5. Respond
  if (!telegramOk && !emailOk) {
    return NextResponse.json(
      { error: "Failed to send message via any channel. Please try again." },
      {
        status: 500,
        headers: rateLimitHeaders(remaining, resetAt),
      }
    );
  }

  return NextResponse.json(
    {
      message: "Message sent successfully!",
      success: true,
      details: { telegram: telegramOk, email: emailOk },
    },
    {
      status: 200,
      headers: rateLimitHeaders(remaining, resetAt),
    }
  );
}
