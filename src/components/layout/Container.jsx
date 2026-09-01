import { cn } from "@/lib/utils";

export function Container({ children, className, ...props }) {
  return (
    <div
      className={cn("w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}
