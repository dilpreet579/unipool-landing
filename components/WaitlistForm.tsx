"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-2 py-2">
        <div className="flex items-center gap-2 text-green-500 dark:text-green-400">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="font-semibold">You&apos;re on the list!</span>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          We&apos;ll email you the moment we launch on Play Store & App Store.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2"
        noValidate
      >
        <Input
          type="email"
          placeholder="your@university.edu"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          required
          disabled={status === "loading"}
          className="h-12 rounded-full pl-5 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex-1"
        />
        <Button
          type="submit"
          disabled={status === "loading" || !email}
          className="h-12 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 font-bold px-6 shrink-0 shadow-md transition-all disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Joining…
            </>
          ) : (
            <>
              Notify me
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>
      {status === "error" && (
        <p className="text-sm text-red-500 text-center">{errorMsg}</p>
      )}
    </div>
  );
}
