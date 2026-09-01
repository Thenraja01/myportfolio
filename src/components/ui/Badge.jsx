import { cn } from "@/lib/utils";

export function Badge({ children, className, variant = "default" }) {
  const variants = {
    default: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 font-semibold",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-semibold",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-semibold",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border backdrop-blur-sm transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
