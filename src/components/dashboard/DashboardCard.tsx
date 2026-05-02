import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashboardCardProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function DashboardCard({
  title,
  description,
  icon,
  action,
  children,
  className,
  contentClassName,
}: DashboardCardProps) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-border/60 bg-card/80 shadow-sm backdrop-blur",
        "transition-colors hover:bg-card",
        className,
      )}
    >
      {(title || description || icon || action) && (
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
          <div className="flex items-start gap-3">
            {icon && (
              <div className="rounded-xl border bg-muted/50 p-2 text-muted-foreground">
                {icon}
              </div>
            )}

            <div>
              {title && (
                <CardTitle className="text-base font-semibold">
                  {title}
                </CardTitle>
              )}

              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>

          {action}
        </CardHeader>
      )}

      <CardContent className={cn("pt-0", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
