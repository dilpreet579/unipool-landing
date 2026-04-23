"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { APK_URL, HAS_APK_URL } from "@/lib/apk";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/icon.png"
            alt="UniPool Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-110"
          />
          <span className="font-extrabold tracking-tight text-2xl text-zinc-900 dark:text-white">
            Uni<span>Pool</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 ml-auto mr-6">
          {navItems.map((item) => {
             return (
               <Link
                 key={item.href}
                 href={item.href}
                 className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
               >
                 {item.label}
               </Link>
             )
          })}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

          {HAS_APK_URL ? (
            <Button asChild className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-lg">
              <a href={APK_URL} download>
                Download APK
              </a>
            </Button>
          ) : (
            <Button disabled className="rounded-full bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 shadow-lg">
              Download APK
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader className="text-left border-b pb-4 mb-4">
                        <SheetTitle className="flex items-center gap-2">
                        <Image
                          src="/images/icon.png"
                          alt="UniPool Logo"
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                        />
                            <span className="font-bold">UniPool</span>
                        </SheetTitle>
                    </SheetHeader>
                    
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                             <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 border-t flex flex-col gap-4">
                        {HAS_APK_URL ? (
                          <Button asChild className="w-full rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200" size="lg">
                            <a href={APK_URL} download onClick={() => setIsOpen(false)}>
                              Download APK
                            </a>
                          </Button>
                        ) : (
                          <Button
                            disabled
                            className="w-full rounded-xl bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                            size="lg"
                          >
                            Download APK
                          </Button>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </nav>
  );
}
