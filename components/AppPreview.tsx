"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Screen {
  /** Filename inside /images/screenshots/ — set to null for placeholder */
  src: string | null;
  /** Short label shown below the frame */
  caption: string;
  /** One-sentence practical description */
  description: string;
  /** Placeholder accent color when no image is available */
  placeholderBg: string;
  /** Short label rendered inside the placeholder frame */
  placeholderLabel: string;
}

const screens: Screen[] = [
  {
    src: "/images/screenshots/nearby-trips.jpg",
    caption: "Nearby Trips",
    description: "See who's heading your way - to the metro, station, or off campus. Filter by time or fare before joining.",
    placeholderBg: "bg-zinc-800",
    placeholderLabel: "Map + trip cards",
  },
  {
    src: "/images/screenshots/trip_details.jpg",
    caption: "Trip Details",
    description: "View the organiser's profile, destination, proposed fare, and available seats before you request to join.",
    placeholderBg: "bg-zinc-800",
    placeholderLabel: "Route · Fare · Seats",
  },
  {
    src: "/images/screenshots/chat.jpg",
    caption: "In-App Chat",
    description: "Sort out pickup points and timings with your travel group directly in the app. No phone numbers shared.",
    placeholderBg: "bg-zinc-800",
    placeholderLabel: "Chat thread",
  },
  {
    src: "/images/screenshots/pink_mode.jpg",
    caption: "Pink Mode",
    description: "Women can find or post trips exclusively among women on the platform. Available as a filter when searching or creating.",
    placeholderBg: "bg-zinc-800",
    placeholderLabel: "Women-only filter",
  },
  {
    src: "/images/screenshots/post_ride.jpg",
    caption: "Post a Trip",
    description: "Heading somewhere? Post your destination, the per-seat fare, and how many can join. Done in under two minutes.",
    placeholderBg: "bg-zinc-800",
    placeholderLabel: "Trip creation form",
  },
];

export function AppPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 260;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }

  return (
    <section id="app-preview" className="py-12 max-w-6xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 px-1">
        <div className="space-y-2 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Inside the App
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            What you&apos;ll see when you open it.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            A quick look at the main screens — no sign-up needed to browse.
          </p>
        </div>

        {/* Scroll controls — desktop only */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="p-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="p-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scroll strip */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth
                   scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]
                   [&::-webkit-scrollbar]:hidden"
      >
        {screens.map((screen, i) => (
          <div
            key={i}
            className="snap-start shrink-0 flex flex-col items-center gap-4 w-[220px]"
          >
            {/* Phone frame — aspect ratio matches 1080×2340 (9:19.5) screenshots */}
            <div className="group relative w-[220px] aspect-[9/19.5] rounded-[36px] border-[6px] border-zinc-700 dark:border-zinc-600 bg-zinc-900 shadow-2xl overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-2">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-b-2xl z-10" />

              {/* Screen content */}
              {screen.src ? (
                <Image
                  src={screen.src}
                  alt={screen.caption}
                  fill
                  className="object-cover object-top"
                  sizes="220px"
                />
              ) : (
                <div className={`w-full h-full ${screen.placeholderBg} flex flex-col items-center justify-center gap-3 px-4`}>
                  {/* Simulated status bar */}
                  <div className="absolute top-5 left-0 right-0 flex justify-between items-center px-5 opacity-30">
                    <span className="text-[9px] text-white font-medium">9:41</span>
                    <div className="flex gap-1 items-center">
                      <div className="w-3 h-1.5 rounded-sm bg-white/60" />
                      <div className="w-1 h-1.5 rounded-sm bg-white/40" />
                    </div>
                  </div>
                  {/* Simulated UI skeleton */}
                  <div className="w-full space-y-2 px-2 mt-6">
                    <div className="h-3 w-1/2 rounded bg-white/10" />
                    <div className="h-2 w-3/4 rounded bg-white/7" />
                  </div>
                  <div className="w-full flex-1 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-2">
                    <p className="text-[11px] text-zinc-400 text-center font-medium leading-relaxed px-3">
                      {screen.placeholderLabel}
                    </p>
                  </div>
                  <div className="w-full space-y-1.5 px-2 pb-4">
                    <div className="h-8 rounded-xl bg-white/10" />
                    <div className="h-8 rounded-xl bg-white/6" />
                  </div>
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="text-center space-y-1 px-1">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">{screen.caption}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{screen.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile scroll hint */}
      <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 md:hidden">
        Swipe to see more screens →
      </p>
    </section>
  );
}
