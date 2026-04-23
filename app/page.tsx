"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ShieldCheck, Zap, HandCoins, Users, Plus } from "lucide-react";
import { Footer } from "@/components/Footer";
import { WaitlistForm } from "@/components/WaitlistForm";
import { APK_URL, HAS_APK_URL, getApkAbsoluteUrl } from "@/lib/apk";

export default function Home() {
  const [qrValue, setQrValue] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Who can use UniPool?",
      answer: "UniPool is exclusively for university students. You sign up using your university email address, which is verified before you can access the app. This keeps the community safe and trustworthy."
    },
    {
      question: "Is UniPool free to use?",
      answer: "The app is completely free to download and use. There are zero platform fees. Hosts set their own fare and passengers pay that amount directly — UniPool takes nothing from the transaction."
    },
    {
      question: "How do I install the APK?",
      answer: "Download the APK from this page, open it on your Android device, and allow installation from unknown sources if prompted. The whole process takes under a minute. iOS and Play Store versions are coming soon."
    },
    {
      question: "Is it safe to ride with strangers?",
      answer: "All users are verified students from your university. Every ride is rated, profiles are visible within the community, and in-app chat keeps all communication traceable. There's also a female-only ride filter for added comfort."
    },
    {
      question: "When will Play Store & App Store versions launch?",
      answer: "We're actively working on both. The Google Play Store and Apple App Store versions are coming very soon. Join the waitlist and we'll notify you the moment they go live."
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
              "UniPool connects university students for safe, affordable carpooling. Zero platform fees, university email verified.",
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

          <div className="relative z-10 space-y-6 max-w-2xl mt-8 md:mt-0">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-white/10 text-white">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              APK Early Access — Free to download
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                Campus rides, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">without the hassle.</span>
              </h1>
              <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-lg">
                UniPool connects university students for safe, affordable carpooling. Split costs, reduce emissions, make your commute something you actually enjoy.
              </p>
              <p className="text-sm text-zinc-500">Free to use · University students only · Android</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              {HAS_APK_URL ? (
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
                    Scan QR Code
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-80">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">Scan on your phone</p>
                      <p className="text-xs text-muted-foreground">
                        Downloads the UniPool APK.
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-zinc-200 dark:border-zinc-800">
            {[
              { stat: "₹0", label: "Platform fee" },
              { stat: "2 min", label: "To post a ride" },
              { stat: "100%", label: "Student verified" },
              { stat: "Real-time", label: "Chat & updates" }
            ].map((item, i) => (
              <div key={i} className="text-center space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">{item.stat}</p>
                <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div id="features" className="space-y-8 py-12 max-w-6xl mx-auto w-full">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Designed for campus life — lightweight, fast, and student-first from the ground up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Zap, title: "Discover Nearby Rides", desc: "Browse rides departing within 5km of you. Filter by price, time, or female-only preference." },
              { icon: Users, title: "In-App Chat", desc: "Coordinate directly with your driver or passengers. No numbers shared, everything in one place." },
              { icon: ShieldCheck, title: "Verified Students Only", desc: "University email verification keeps the community safe and trustworthy. No outsiders, ever." },
              { icon: HandCoins, title: "Transparent Fares", desc: "Hosts set their own price. You see the fare upfront — no surge pricing, no hidden fees." }
            ].map((f, i) => (
              <Card key={i} className="rounded-3xl shadow-sm border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <CardHeader>
                  <div className="bg-zinc-100 dark:bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-zinc-900 dark:text-white" />
                  </div>
                  <CardTitle className="text-xl">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-6xl mx-auto w-full">
          <div id="how-it-works" className="space-y-6 md:space-y-8 py-8 md:py-12 rounded-3xl bg-zinc-900 text-white p-6 md:p-12 shadow-lg my-8 md:my-12">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                From signup to shared ride in minutes.
              </h2>
              <p className="text-xl text-zinc-400">
                Three steps and you&apos;re moving. UniPool gets out of your way.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-4">
                <p className="text-5xl font-black text-white/20">01</p>
                <h3 className="text-xl font-bold">Create your student account</h3>
                <p className="text-zinc-400">Sign up with your university email. Verify, set up your profile, done — under 2 minutes.</p>
              </div>
              <div className="space-y-4">
                <p className="text-5xl font-black text-white/20">02</p>
                <h3 className="text-xl font-bold">Browse or publish a ride</h3>
                <p className="text-zinc-400">Find rides near you on the map, or post your own route as a host and set your fare.</p>
              </div>
              <div className="space-y-4">
                <p className="text-5xl font-black text-white/20">03</p>
                <h3 className="text-xl font-bold">Request, chat, and go</h3>
                <p className="text-zinc-400">Request a seat, coordinate over chat, head out. Rate each other when you arrive.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Area */}
        <div id="faq" className="py-12 max-w-4xl mx-auto space-y-8 w-full">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">Questions answered.</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">Everything you need to know before your first ride.</p>
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
          <div id="download" className="py-12 sm:py-16 text-center space-y-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6 sm:p-12 shadow-sm border border-zinc-200 dark:border-zinc-800">
            
            {/* APK Download */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white pb-2">Ready to ride smarter?</h2>
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400">Download the APK now. Available on Android — free forever.</p>
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
            <div className="space-y-4 max-w-xl mx-auto">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">Get notified for Play Store & App Store</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">Join the waitlist and be first to know when we launch.</p>
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
