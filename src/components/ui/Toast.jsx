"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export function Toast({ message, onClose }) {
  if (!message) return null;

  const isSuccess = message.type === "success";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl glass-panel border shadow-2xl backdrop-blur-xl"
        style={{
          borderColor: isSuccess ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)",
          background: isSuccess ? "rgba(15, 23, 42, 0.9)" : "rgba(30, 10, 10, 0.9)",
        }}
      >
        {isSuccess ? (
          <CheckCircle2 className="text-green-400 shrink-0" size={20} />
        ) : (
          <AlertCircle className="text-red-400 shrink-0" size={20} />
        )}

        <span className="text-sm font-medium text-slate-100">{message.text}</span>

        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-slate-100 transition-colors p-1"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
