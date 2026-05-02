import { FileClock, ShieldCheck, UserRound } from "lucide-react";
import { DashboardCardShell } from "./DashboardCardShell";

type PendingApplicationCardProps = {
  firstName: string;
  lastName: string;
  rank: string;
  division: string;
  specialization?: string | null;
  yearsOfService: number;
};

export function PendingApplicationCard({
  firstName,
  lastName,
  rank,
  division,
  specialization,
  yearsOfService,
}: PendingApplicationCardProps) {
  return (
    <DashboardCardShell className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl border border-blue-500/25 bg-blue-500/10 p-2.5 text-blue-400">
            <FileClock className="h-4 w-4" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Aplikacja postaci
            </p>

            <h3 className="mt-1 text-base font-semibold">
              Oczekuje na zatwierdzenie
            </h3>
          </div>
        </div>

        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
          Oczekuje
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <UserRound className="h-3.5 w-3.5" />
            Postać
          </div>

          <p className="mt-1 text-lg font-semibold">
            {firstName} {lastName}
          </p>

          <p className="text-sm text-muted-foreground">{rank}</p>
        </div>

        <div className="grid gap-3 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-muted-foreground">Dywizja</p>
            <p className="mt-1 font-medium">{division}</p>
          </div>

          {specialization && (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <p className="text-muted-foreground">Specjalizacja</p>
              <p className="mt-1 font-medium">{specialization}</p>
            </div>
          )}

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-muted-foreground">Lata służby</p>
            <p className="mt-1 font-medium">{yearsOfService}</p>
          </div>
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          Po zatwierdzeniu postać zostanie aktywowana w systemie LSPD.
        </p>
      </div>
    </DashboardCardShell>
  );
}
