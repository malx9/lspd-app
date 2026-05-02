import { ReactNode } from "react";
import { DashboardCard } from "./DashboardCard";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  helper?: string;
};

export function StatCard({ label, value, icon, helper }: StatCardProps) {
  return (
    <DashboardCard icon={icon} contentClassName="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-semibold tracking-tight">{value}</p>

      {helper && <p className="text-xs text-muted-foreground">{helper}</p>}
    </DashboardCard>
  );
}
