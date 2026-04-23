import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t py-12 bg-white dark:bg-black border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto w-full px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/icon.png"
                alt="UniPool Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                UniPool
              </h2>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
              Campus rides, simplified. Built by students, for students.
            </p>
            <div className="pt-4 text-xs text-zinc-400 dark:text-zinc-500">
              © {currentYear} UniPool. <br /> All rights reserved.
            </div>
          </div>

          {/* Column 2: Important Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-zinc-900 dark:text-white">Important Links</h3>
            <ul className="space-y-2 text-sm">
              {/*<li>
                <Link
                  href="#"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>*/}
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.termsfeed.com/live/ef243793-b6d4-4623-8e21-b0e00224c8da"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Column 3: Coming Soon */}
          <div className="space-y-4">
            {/* Follow Us (disabled for now)
            <h3 className="font-bold text-zinc-900 dark:text-white">Follow Us</h3>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            */}
            <h3 className="font-bold text-zinc-900 dark:text-white">Coming Soon</h3>
            <div>
              {/*<div className="pt-4">
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">Coming Soon</p>*/}
              <div className="flex gap-2">
                <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded px-2 flex items-center justify-center text-[10px] text-zinc-500 font-medium cursor-not-allowed">App Store</div>
                <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded px-2 flex items-center justify-center text-[10px] text-zinc-500 font-medium cursor-not-allowed">Google Play</div>
              </div>
            </div>
          </div>
        </div>
        {/*<div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-500 text-sm">
          <p>Privacy Policy · Terms of Service</p>
        </div>*/}
      </div>
    </footer>
  );
}
