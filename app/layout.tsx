import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://www.unipool.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "UniPool — Campus Rides, Without the Hassle",
    template: "%s | UniPool",
  },
  description:
    "UniPool connects university students for safe, affordable carpooling. Download the free Android APK. Zero platform fees, university email verified.",
  keywords: [
    "carpooling",
    "university students",
    "campus rides",
    "ridesharing",
    "college commute",
    "student carpool",
    "affordable rides",
    "India",
    "NIT Delhi",
  ],
  authors: [{ name: "UniPool", url: BASE_URL }],
  creator: "UniPool",
  publisher: "UniPool",

  alternates: {
    canonical: BASE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "UniPool",
    title: "UniPool — Campus Rides, Without the Hassle",
    description:
      "UniPool connects university students for safe, affordable carpooling. Download the free Android APK. Zero platform fees, university email verified.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UniPool — Campus rides, without the hassle.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "UniPool — Campus Rides, Without the Hassle",
    description:
      "UniPool connects university students for safe, affordable carpooling. Free to download. Zero platform fees.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
    apple: "/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
