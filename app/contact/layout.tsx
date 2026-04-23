import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have a question, feedback, or partnership idea? Get in touch with the UniPool team. We're happy to help.",
  alternates: {
    canonical: "https://www.unipool.dev/contact",
  },
  openGraph: {
    title: "Contact Us | UniPool",
    description:
      "Have a question, feedback, or partnership idea? Get in touch with the UniPool team.",
    url: "https://www.unipool.dev/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
