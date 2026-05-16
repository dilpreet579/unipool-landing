import { Zap, MessageSquare, ShieldCheck, HandCoins, Heart, Users } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-12 max-w-6xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Features
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
          What the app does.
        </h2>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-auto">

        {/* Row 1 — hero card (4/6) + dark accent card (2/6) */}
        <div className="md:col-span-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7 flex flex-col gap-5">
          <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-zinc-900 dark:text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Find Travel Companions</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
              See who&apos;s heading your way — to the metro, railway station, airport, or anywhere off campus.
              Filter by time, destination, or fare before you request to join.
            </p>
          </div>
          {/* Example use-case tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {["Metro station", "Railway station", "Airport", "Daily commute", "Late-night travel"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 rounded-2xl bg-zinc-950 border border-zinc-800 p-7 flex flex-col gap-5">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Verified Members Only</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Everyone registers with an institutional email. You only ever travel with verified
              students, faculty, or staff from your own campus.
            </p>
          </div>
        </div>

        {/* Row 2 — three equal cards */}
        <div className="md:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col gap-4">
          <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-zinc-900 dark:text-white" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Coordinate Over Chat</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              Sort out pickup points, timings, and booking details in the app. No phone numbers shared.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col gap-4">
          <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <HandCoins className="w-5 h-5 text-zinc-900 dark:text-white" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Split the Fare Fairly</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              The organiser sets a per-seat amount. You see it before joining — no surprises, no platform cut.
            </p>
          </div>
        </div>

        {/* Pink Mode — accent tint */}
        <div className="md:col-span-2 rounded-2xl border border-pink-200 dark:border-pink-900/50 bg-pink-50 dark:bg-pink-950/20 p-6 flex flex-col gap-4">
          <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Pink Mode</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Women can find or post trips exclusively among women — a filter available when searching or creating a trip.
            </p>
          </div>
        </div>

        {/* Row 3 — full-width horizontal banner */}
        <div className="md:col-span-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-zinc-900 dark:text-white" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Open to the Whole Campus</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              Not just students — faculty and institute staff can register and use UniPool too.
              The more members on the platform, the easier it is for everyone to find someone heading the same way.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
