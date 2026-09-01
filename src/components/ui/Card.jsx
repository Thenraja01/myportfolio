import { cn } from "@/lib/utils";

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "glass-card-morphism rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-slate-100 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
