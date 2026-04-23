"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, Mail, Phone, MessageSquare, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Footer } from "@/components/Footer";

// ─── Validation Schema ────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 characters")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be at most 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: ContactFormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          toast.error("Too many requests. Please wait a minute and try again.");
        } else {
          toast.error(data.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      toast.success("Message sent! We'll get back to you soon.");
      form.reset();
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-950 flex flex-col transition-colors">
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-12 md:py-20 w-full">

        {/* Header */}
        <div className="text-center space-y-4 mb-10 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Contact Us
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Have a question, feedback, or partnership idea? We&apos;d love to hear from you. Fill out the form and we&apos;ll respond as soon as possible.
          </p>
        </div>

        {/* Form Card */}
        <Card className="w-full max-w-lg rounded-3xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-zinc-900 dark:text-white">Send a message</CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400">
              All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>

                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                        <User className="w-3.5 h-3.5" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          className="h-11 rounded-xl border-zinc-200 dark:border-zinc-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                        <Mail className="w-3.5 h-3.5" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@university.edu"
                          className="h-11 rounded-xl border-zinc-200 dark:border-zinc-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                        <Phone className="w-3.5 h-3.5" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+917000000000"
                          className="h-11 rounded-xl border-zinc-200 dark:border-zinc-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what's on your mind…"
                          className="min-h-32 rounded-xl border-zinc-200 dark:border-zinc-700 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-zinc-400 text-right mt-1">
                        {field.value.length}/1000
                      </p>
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 font-bold text-base shadow-lg disabled:opacity-60 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

              </form>
            </Form>
          </CardContent>
        </Card>

      </main>
      <Footer />
    </div>
  );
}
