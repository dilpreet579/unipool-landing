import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Have a question about UniPool, a bug to report, or want to bring the platform to your institution? Reach out to the team.",
  alternates: {
    canonical: "https://www.unipool.dev/contact",
  },
  openGraph: {
    title: "Get in Touch | UniPool",
    description:
      "Contact the UniPool team - questions, feedback, or enquiries about bringing UniPool to your campus.",
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
