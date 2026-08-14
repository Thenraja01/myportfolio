import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "thenwthen@gmail.com";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.length > 2000)
      newErrors.message = "Message too long (max 2000 chars)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject || "New portfolio message",
          message: formData.message,
          to_email: CONTACT_EMAIL,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const inputClasses = (field) =>
    `w-full rounded-xl border bg-white/5 px-4 py-3 pl-11 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 backdrop-blur-sm ${
      errors[field]
        ? "border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
        : "border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
    }`;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30">
      {/* Background gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-600/20 blur-[128px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-indigo-600/15 blur-[128px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-violet-600/10 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          {/* Left: Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-medium text-purple-300">
              <Sparkles className="h-3.5 w-3.5" />
              Open to opportunities
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Let's <span className="text-purple-400">talk</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Have a project in mind or just want to say hi? Fill out the form
              and I'll get back to you as soon as possible.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">
                    Email
                  </p>
                  <p className="mt-0.5 text-sm text-white/80">
                    {CONTACT_EMAIL}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <MapPin className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">
                    Location
                  </p>
                  <p className="mt-0.5 text-sm text-white/80">
                    Remote / Worldwide
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Socials
              </p>
              <div className="mt-4 flex gap-3">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50 ring-1 ring-white/10 transition-all hover:bg-purple-500/20 hover:text-purple-400 hover:ring-purple-500/30"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                      <CheckCircle className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">
                      Message sent!
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-white/50">
                      Thanks for reaching out. I'll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-8 rounded-xl bg-purple-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-purple-600 active:scale-95"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Name */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/60">
                        Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={inputClasses("name")}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/60">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={inputClasses("email")}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/60">
                        Subject{" "}
                        <span className="text-white/30">(optional)</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Project inquiry"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pl-11 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/60">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell me about your project..."
                        className={`${inputClasses("message")} resize-none pl-4 pt-3`}
                      />
                      <div className="mt-1.5 flex items-center justify-between">
                        {errors.message ? (
                          <p className="flex items-center gap-1 text-xs text-red-400">
                            <AlertCircle className="h-3 w-3" />
                            {errors.message}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span
                          className={`text-xs ${
                            formData.message.length > 1800
                              ? "text-amber-400"
                              : "text-white/30"
                          }`}
                        >
                          {formData.message.length}/2000
                        </span>
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileTap={{ scale: 0.98 }}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </motion.button>

                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-1.5 text-center text-xs text-red-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5" />
                        Something went wrong. Please try again.
                      </motion.p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;