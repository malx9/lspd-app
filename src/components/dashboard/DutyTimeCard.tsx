import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardCardShell } from "./DashboardCardShell";

type DutyDay = {
  label: string;
  minutes: number;
};

type DutyTimeCardProps = {
  minutesThisWeek: number;
  targetMinutes?: number;
  days: DutyDay[];
};

function formatMinutes(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${h}h ${m}m`;
}

export function DutyTimeCard({
  minutesThisWeek,
  targetMinutes = 420,
  days,
}: DutyTimeCardProps) {
  const percentage = Math.min(
    Math.round((minutesThisWeek / targetMinutes) * 100),
    100,
  );

  const isGood = minutesThisWeek >= targetMinutes;
  const maxDayMinutes = Math.max(...days.map((day) => day.minutes), 60);

  return (
    <DashboardCardShell
      className={cn(
        "p-5",
        isGood ? "border-emerald-500/20" : "border-amber-500/25",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock3 className="h-4 w-4" />
            Czas służby w tym tygodniu
          </div>

          <p className="mt-3 text-3xl font-semibold tracking-tight">
            {formatMinutes(minutesThisWeek)}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Wymagany próg: {formatMinutes(targetMinutes)}
          </p>
        </div>

        <div
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
            isGood
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-amber-500/10 text-amber-400",
          )}
        >
          {isGood ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <AlertTriangle className="h-3.5 w-3.5" />
          )}
          {isGood ? "W normie" : "Za mało"}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Postęp tygodniowy</span>
          <span>{percentage}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isGood ? "bg-emerald-500" : "bg-amber-500",
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-7 flex h-28 items-end gap-2">
        {days.map((day) => {
          const height = day.minutes
            ? Math.max((day.minutes / maxDayMinutes) * 100, 8)
            : 6;

          return (
            <div
              key={day.label}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div className="flex h-20 w-full items-end">
                <div
                  className={cn(
                    "w-full rounded-t-md transition-all",
                    day.minutes > 0
                      ? isGood
                        ? "bg-emerald-500/70"
                        : "bg-amber-500/70"
                      : "bg-white/8",
                  )}
                  style={{ height: `${height}%` }}
                  title={`${day.label}: ${formatMinutes(day.minutes)}`}
                />
              </div>

              <span className="text-[11px] text-muted-foreground">
                {day.label}
              </span>
            </div>
          );
        })}
      </div>
    </DashboardCardShell>
  );
}
