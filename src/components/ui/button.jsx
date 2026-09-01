"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30 btn-3d",
    secondary:
      "bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 border border-slate-700/50 glass-panel",
    outline:
      "bg-transparent border border-slate-700 hover:border-indigo-500 text-slate-200 hover:text-white",
    ghost: "bg-transparent hover:bg-white/5 text-slate-300 hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
