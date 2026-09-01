"use client";

import { useContactForm } from "@/hooks/useContactForm";
import { ContactInput } from "./ContactInput";
import { ContactTextarea } from "./ContactTextarea";
import { Toast } from "@/components/ui/Toast";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const {
    formData,
    status,
    errors,
    toastMessage,
    handleChange,
    handleSubmit,
    clearToast,
  } = useContactForm();

  const isLoading = status === "LOADING";
  const isSuccess = status === "SUCCESS";
  const messageLength = formData.message ? formData.message.length : 0;

  return (
    <div className="relative">
      <Toast message={toastMessage} onClose={clearToast} />

      <div className="p-8 sm:p-10 rounded-3xl border border-indigo-200/80 dark:border-slate-800/90 bg-white/75 dark:bg-slate-900/90 backdrop-blur-2xl shadow-2xl shadow-indigo-100/50 dark:shadow-slate-950/50 space-y-6 transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot field (hidden from normal users) */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <ContactInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            error={errors.name}
            autocomplete="name"
          />

          <ContactInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            error={errors.email}
            autocomplete="email"
          />

          <ContactInput
            label="Subject (optional)"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Project inquiry"
            error={errors.subject}
            required={false}
          />

          <div className="relative">
            <ContactTextarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={4}
              error={errors.message}
            />
            <div className="text-[11px] font-mono text-slate-600 dark:text-slate-500 text-right mt-1 font-medium">
              {messageLength}/2000
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 size={18} /> Message Sent
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
