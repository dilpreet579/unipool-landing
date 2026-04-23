"use client";

import { useState, useEffect } from "react";

type OS = "ios" | "android" | "windows" | "mac" | "linux" | "unknown";

export function useOS() {
  const [os, setOs] = useState<OS>("unknown");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nav = window.navigator as unknown as { userAgent?: string; vendor?: string; opera?: string };
      const win = window as unknown as { MSStream?: boolean };
      const userAgent = nav.userAgent || nav.vendor || nav.opera || "";

      if (/iPad|iPhone|iPod/.test(userAgent) && !win.MSStream) {
        setOs("ios");
      } else if (/android/i.test(userAgent)) {
        setOs("android");
      } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
        setOs("mac");
      } else if (/Windows/i.test(userAgent)) {
        setOs("windows");
      } else if (/Linux/i.test(userAgent)) {
        setOs("linux");
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return os;
}
