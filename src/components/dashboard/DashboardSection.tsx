import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DashboardSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function DashboardSection({
  title,
  description,
  children,
  action,
  className,
}: DashboardSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}
