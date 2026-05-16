"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ShieldCheck, Zap, HandCoins, Users, Plus, Heart, MessageSquare } from "lucide-react";
import { Footer } from "@/components/Footer";
import { WaitlistForm } from "@/components/WaitlistForm";
import { AppPreview } from "@/components/AppPreview";
import { Features } from "@/components/Features";
import { OfficialLaunch } from "@/components/OfficialLaunch";
import { APK_URL, HAS_APK_URL, getApkAbsoluteUrl } from "@/lib/apk";
import { useOS } from "@/hooks/use-os";

export default function Home() {
  const os = useOS();
  const [qrValue, setQrValue] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Who can use UniPool?",
      answer: "UniPool is open to students, faculty, and staff at participating universities. You register with your institutional email address, which we verify before giving you access. That one step is what keeps the community limited to people from your campus."
    },
    {
      question: "Do I need to own a vehicle to use UniPool?",
      answer: "No. Most students use UniPool to find others travelling the same way and share a cab, auto, or Ola/Uber together. You don't need a vehicle, you just need to be heading somewhere. Faculty and staff may also use the platform for traditional carpooling in personal vehicles."
    },
    {
      question: "How does fare splitting work?",
      answer: "The person who creates the ride sets the total fare or per-seat amount. Everyone joining shares that cost equally. UniPool does not take any cut, the amount you see is exactly what you pay."
    },
    {
      question: "How do I install the APK on my Android phone?",
      answer: "Download the APK file from this page and open it on your Android device. Your phone may ask you to allow installation from unknown sources — just tap Allow. The whole thing takes under a minute. If you're on iOS, you can join the waitlist and we'll notify you when the App Store version is ready."
    },
    {
      question: "How do I know it's safe to travel with someone?",
      answer: "Everyone on the platform is a verified member of your institution - students, faculty, or staff. Profiles are visible to all community members, trips are rated after completion, and all coordination happens through the in-app chat, so there's a clear record. There is also a Pink Mode (women-only option) available."
    },
    {
      question: "What is Pink Mode?",
      answer: "Pink Mode is a filter that lets women coordinate shared rides exclusively with other women on the platform. You can use it whether you're looking for a ride or posting one."
    },
    {
      question: "When will the Google Play Store and Apple App Store versions be available?",
      answer: "Both are currently in progress. Join the waitlist below and we'll send you an email the moment either goes live."
    },
    {
      question: "Which university launched UniPool?",
      answer: "UniPool was officially launched at NIT Delhi, inaugurated at the Director's office. We are now looking to onboard other institutions — if you'd like UniPool at your campus, reach out to us through the Contact page."
    }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-950 flex flex-col transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "UniPool",
            applicationCategory: "TransportationApplication",
            operatingSystem: "Android",
            description:
              "UniPool helps the NIT Delhi campus community coordinate and share rides - split cab and auto fares, find travel companions, and get around safely. Free Android APK. No platform fees.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
            },
            url: "https://www.unipool.dev",
            downloadUrl: "https://www.unipool.dev/downloads/unipool.apk",
            screenshot: "https://www.unipool.dev/og-image.png",
            publisher: {
              "@type": "Organization",
              name: "UniPool",
              url: "https://www.unipool.dev",
            },
          }),
        }}
      />
      <main className="flex-1 p-4 md:p-8 space-y-12 overflow-y-auto w-full">

        {/* Hero Section */}
        <div className="relative h-[550px] md:h-[500px] w-full overflow-hidden bg-zinc-950 flex items-center rounded-3xl p-6 md:p-10 shadow-lg group">
          <div className="absolute top-0 right-0 w-full md:w-[70%] h-full z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-80 md:opacity-100"
            >
              <source src="/videos/hero-car.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-zinc-950/20 md:bg-zinc-950/10" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 from-40% md:from-30% via-zinc-950/80 via-70% md:via-60% to-transparent z-1 pointer-events-none" />

          <div className="relative z-10 space-y-5 max-w-3xl mt-8 md:mt-0">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-white/10 text-white">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Officially launched at NIT Delhi · Android APK available
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                Share the ride. Split the fare. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Travel together.</span>
              </h1>
              <p className="text-zinc-300 text-base sm:text-lg max-w-lg">
                Find people heading your way, share a cab or auto together, and split the fare. No vehicle needed - just a destination.
              </p>
              <p className="text-sm text-zinc-500">Free · Verified members only · Android</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {os === "ios" ? (
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-white text-zinc-950 hover:bg-zinc-200 border-0 font-bold px-8 h-14 text-lg rounded-full shadow-2xl"
                >
                  <a href="#waitlist">Join iOS Waitlist</a>
                </Button>
              ) : HAS_APK_URL ? (
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-white text-zinc-950 hover:bg-zinc-200 border-0 font-bold px-8 h-14 text-lg rounded-full shadow-2xl"
                >
                  <a href={APK_URL} download>
                    Download APK
                  </a>
                </Button>
              ) : (
                <Button
                  size="lg"
                  disabled
                  className="w-full sm:w-auto bg-white text-zinc-950 border-0 font-bold px-8 h-14 text-lg rounded-full shadow-2xl"
                >
                  Download APK
                </Button>
              )}
              <Popover
                onOpenChange={(open) => {
                  if (!open) return;
                  setQrValue(getApkAbsoluteUrl(window.location.origin));
                }}
              >
                <PopoverTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    disabled={!HAS_APK_URL}
                    className="hidden md:inline-flex w-full sm:w-auto bg-transparent text-white hover:text-white border-white/20 hover:bg-white/10 font-bold px-8 h-14 text-lg rounded-full disabled:opacity-50"
                  >
                    On Desktop? Scan QR Code
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-80">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">Scan on your phone</p>
                      <p className="text-xs text-muted-foreground">
                        Downloads the UniPool APK directly.
                      </p>
                    </div>
                    <div className="mx-auto w-fit rounded-xl bg-white p-3">
                      {qrValue ? (
                        <QRCode value={qrValue} size={180} />
                      ) : (
                        <div className="h-[180px] w-[180px]" />
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Proof Strip */}
        <div className="max-w-6xl mx-auto w-full px-2 sm:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-zinc-200 dark:border-zinc-800">
            {[
              { stat: "₹0", label: "Platform fee, ever" },
              { stat: "2 min", label: "To post your ride" },
              { stat: "Verified", label: "Institutional email required" },
              { stat: "NIT Delhi", label: "First campus to launch" }
            ].map((item, i) => (
              <div key={i} className="text-center space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">{item.stat}</p>
                <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About the Project */}
        <div className="max-w-6xl mx-auto w-full">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 space-y-6 shadow-sm">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">About the project</p>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                Built at NIT Delhi, for NIT Delhi.
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                UniPool helps the campus community coordinate shared travel - students find others going the same way and share a cab, auto, or Ola/Uber, splitting the fare between them. It is a campus project developed by students of the Department of Computer Science &amp; Engineering at NIT Delhi.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Developed by</p>
                <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  <li>Dilpreet Singh <span className="text-zinc-400 dark:text-zinc-500">(231210041)</span></li>
                  <li>Ishita Gupta <span className="text-zinc-400 dark:text-zinc-500">(231210050)</span></li>
                  <li>Madhav Raj <span className="text-zinc-400 dark:text-zinc-500">(231210064)</span></li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Under the guidance of</p>
                <div className="text-sm text-zinc-700 dark:text-zinc-300 space-y-0.5">
                  <p className="font-semibold">Dr. Karan Verma</p>
                  <p className="text-zinc-500 dark:text-zinc-400">Dept. of Computer Science &amp; Engineering</p>
                  <p className="text-zinc-500 dark:text-zinc-400">NIT Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <Features />

        {/* How It Works */}
        <div className="max-w-6xl mx-auto w-full">
          <div id="how-it-works" className="space-y-6 md:space-y-8 py-8 md:py-10 rounded-3xl bg-zinc-900 text-white p-6 md:p-10 shadow-lg my-8 md:my-10">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Getting started takes about two minutes.
              </h2>
              <p className="text-xl text-zinc-400">
                Three steps to your first shared ride.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-4">
                <p className="text-5xl font-black text-white/20">01</p>
                <h3 className="text-xl font-bold">Sign up with your institutional email</h3>
                <p className="text-zinc-400">Create an account using your NIT Delhi email. We verify it to confirm you belong to the institution, then you&apos;re in.</p>
              </div>
              <div className="space-y-4">
                <p className="text-5xl font-black text-white/20">02</p>
                <h3 className="text-xl font-bold">Post a trip or join one</h3>
                <p className="text-zinc-400">Heading to the metro, station, or anywhere nearby? Post your trip and invite others going the same way, or join a trip someone else has already posted.</p>
              </div>
              <div className="space-y-4">
                <p className="text-5xl font-black text-white/20">03</p>
                <h3 className="text-xl font-bold">Coordinate, travel, split</h3>
                <p className="text-zinc-400">Agree on a pickup point over in-app chat, book the cab or auto together, and split the fare equally. Rate the experience once you arrive.</p>
              </div>
            </div>
          </div>
        </div>

        {/* App Preview */}
        <AppPreview />

        {/* Official Launch */}
        <OfficialLaunch />

        {/* FAQ Area */}
        <div id="faq" className="py-10 max-w-4xl mx-auto space-y-8 w-full">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">Common questions.</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">Answers to what students, parents, and faculty usually ask.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-zinc-200 dark:border-zinc-800 last:border-0"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full py-6 flex items-center justify-between text-left group transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {faq.question}
                  </h3>
                  <div className={`p-1 rounded-full transition-all duration-300 ${openFaqIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                    <Plus className="w-6 h-6 text-zinc-500" />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-0">
          <div id="download" className="py-10 sm:py-12 text-center space-y-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-zinc-200 dark:border-zinc-800">

            {/* APK Download */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white pb-2">Try it on Android today.</h2>
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400">Download the APK directly - no app store needed. Free, with no account charges.</p>
              <div className="flex justify-center pt-2">
                {HAS_APK_URL ? (
                  <Button
                    asChild
                    size="lg"
                    className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 rounded-full h-14 px-10 text-lg font-bold shadow-lg"
                  >
                    <a href={APK_URL} download>
                      Download APK
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    disabled
                    className="bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 rounded-full h-14 px-10 text-lg font-bold shadow-lg"
                  >
                    Download APK
                  </Button>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 max-w-sm mx-auto">
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
            </div>

            {/* Waitlist */}
            <div id="waitlist" className="space-y-4 max-w-xl mx-auto">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">Get notified when we launch on Play Store &amp; App Store</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">Leave your email and we&apos;ll reach out the moment either version goes live. No spam.</p>
              </div>
              <WaitlistForm />
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
