import { cn } from "@/lib/utils";

export function DashboardCardShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "border border-white/10",
        "bg-white/[0.055]",
        "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
        "backdrop-blur-xl",

        className,
      )}
    >
      {children}
    </div>
  );
}
