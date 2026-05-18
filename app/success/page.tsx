import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="max-w-md w-full rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-10 shadow-sm text-center space-y-6">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Email Verified Successfully!
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Your institutional email has been verified. You can now close this tab and return to the UniPool app on your phone to log in.
          </p>
        </div>

        {/* Action (Optional return to home) */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full h-12 font-medium text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <Link href="/">
              Return to Homepage
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
