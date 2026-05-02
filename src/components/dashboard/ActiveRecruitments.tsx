"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardCardShell } from "./DashboardCardShell";

type Recruitment = {
  id: string;
  divisionName: string;
  deadline: string | Date;
};

type ActiveRecruitmentsCardProps = {
  recruitments: Recruitment[];
};

function getDaysLeft(deadline: string | Date) {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function ActiveRecruitmentsCard({
  recruitments,
}: ActiveRecruitmentsCardProps) {
  const visible = recruitments.slice(0, 3);

  return (
    <DashboardCardShell className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Rekrutacje
          </p>

          <h2 className="mt-2 text-xl font-semibold">Aktywne rekrutacje</h2>
        </div>

        <Link
          href="/recruitments"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-blue-400"
        >
          Wszystkie rekrutacje
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {visible.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-muted-foreground">
            Obecnie brak aktywnych rekrutacji.
          </div>
        )}

        {visible.map((rec) => {
          const daysLeft = getDaysLeft(rec.deadline);
          const isEndingSoon = daysLeft <= 3;

          return (
            <div
              key={rec.id}
              className={cn(
                "flex items-center justify-between gap-4 rounded-xl border p-4",
                "bg-white/[0.04] transition-all",
                "hover:bg-gradient-to-r hover:from-white/[0.08] hover:to-transparent",
                isEndingSoon
                  ? "border-amber-500/35 shadow-[0_0_40px_rgba(245,158,11,0.08)]"
                  : "border-white/10",
              )}
            >
              <div className="min-w-0">
                <p className="font-semibold text-foreground">
                  {rec.divisionName}
                </p>

                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarClock className="h-3.5 w-3.5" />
                  Deadline: {formatDate(rec.deadline)}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    isEndingSoon
                      ? "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                      : "bg-white/10 text-muted-foreground",
                  )}
                >
                  {daysLeft > 0 ? `${daysLeft} dni` : "Dziś"}
                </span>

                <Button size="sm" asChild>
                  <Link href={`/recruitments/${rec.id}`}>
                    Sprawdź
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {recruitments.length > 3 && (
        <p className="mt-4 text-xs text-muted-foreground">
          +{recruitments.length - 3} więcej rekrutacji
        </p>
      )}
    </DashboardCardShell>
  );
}
