import { CarFront, Shield, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardCardShell } from "./DashboardCardShell";

type PatrolOfficer = {
  id: string;
  rank: string;
  characterName: string;
  oocNickname: string;
};

type PatrolAssignmentCardProps = {
  vehicleModel: string;
  vehicleUid: string;
  division: string;
  specialization?: string | null;
  officers: PatrolOfficer[];
  className?: string;
};

export function PatrolAssignmentCard({
  vehicleModel,
  vehicleUid,
  division,
  specialization,
  officers,
  className,
}: PatrolAssignmentCardProps) {
  return (
    <DashboardCardShell className={cn("p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Patrol
          </p>

          <h2 className="mt-2 text-xl font-semibold">Przydział patrolowy</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Aktualny pojazd, skład patrolu i przypisana dywizja.
          </p>
        </div>

        <div className="rounded-xl border border-blue-500/25 bg-blue-500/10 p-3 text-blue-400">
          <CarFront className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CarFront className="h-4 w-4" />
            Pojazd
          </div>

          <p className="mt-2 font-semibold text-foreground">{vehicleModel}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            UID: {vehicleUid}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            Jednostka
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              {division}
            </span>

            {specialization && (
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                {specialization}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium">
          <UsersRound className="h-4 w-4 text-muted-foreground" />
          Ekipa patrolowa
        </div>

        <div className="space-y-3">
          {officers.map((officer) => (
            <div
              key={officer.id}
              className="flex items-center justify-between gap-4 rounded-lg bg-white/[0.035] px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {officer.rank} {officer.characterName}
                </p>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {officer.oocNickname}
                </p>
              </div>

              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-muted-foreground">
                Officer
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardCardShell>
  );
}
