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
    default: "UniPool | Ride Sharing for University Students",
    template: "%s | UniPool",
  },
  description:
    "UniPool helps students, faculty, and staff at NIT Delhi coordinate and share rides - split cab and auto fares, find travel companions, and get around safely. Free Android APK. No platform fees.",
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
    "NIT Delhi ride sharing",
    "campus commute",
    "faculty ride sharing",
    "Pink Mode",
    "women only rides",
    "student safety",
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
    title: "UniPool — Ride Sharing for University Students",
    description:
      "UniPool helps students, faculty, and staff at NIT Delhi coordinate and share rides — find travel companions, split cab or auto fares, and travel safely within the campus community.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UniPool — Ride sharing for university students, launched at NIT Delhi.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "UniPool — Ride Sharing for University Students",
    description:
      "Coordinate shared rides with your campus community. Split cab and auto fares, find travel companions, and travel safely. Free to download.",
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
