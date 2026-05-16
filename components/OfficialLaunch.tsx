import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function OfficialLaunch() {
  return (
    <section
      id="launch"
      className="max-w-4xl mx-auto w-full"
      aria-labelledby="launch-heading"
    >
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">

        {/* Photos — stacked on mobile, side-by-side on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 bg-zinc-100 dark:bg-zinc-800">
          <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden">
            <Image
              src="/images/launch_1.jpg"
              alt="Inauguration at the Director's office, NIT Delhi"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden">
            <Image
              src="/images/launch_2.jpg"
              alt="Team at the official UniPool launch, NIT Delhi"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Caption strip */}
        <div className="px-6 md:px-10 py-5 flex flex-col gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Official Launch
            </p>
            <p
              id="launch-heading"
              className="text-base font-semibold text-zinc-900 dark:text-white"
            >
              Official launch of UniPool at NIT Delhi.
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              In the presence of Prof. (Dr.) Ajay K Sharma, Director, NIT Delhi, and Prof. (Dr.) Hitesh Sharma, Registrar, NIT Delhi.
            </p>
          </div>

          <Link
            href="https://www.linkedin.com/posts/nitdofficial_unipool-unipool-unipool-activity-7458123220618149889-lpI4"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            View NIT Delhi LinkedIn announcement
            <ExternalLink className="w-3 h-3 shrink-0" />
          </Link>
        </div>

      </div>
    </section>
  );
}
