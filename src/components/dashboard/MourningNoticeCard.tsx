import { Ribbon } from "lucide-react";

type MourningNoticeCardProps = {
  officerRank: string;
  officerName: string;
  requiredUntil: string;
};

export function MourningNoticeCard({
  officerRank,
  officerName,
  requiredUntil,
}: MourningNoticeCardProps) {
  return (
    <div className="rounded-xl border border-amber-500/35 bg-amber-500/[0.08] px-4 py-3 shadow-[0_12px_40px_rgba(245,158,11,0.08)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-amber-500/25 bg-black/20 p-2 text-amber-400">
          <Ribbon className="h-4 w-4" />
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-amber-300/80">
            Czarne opaski
          </p>

          <p className="mt-1 text-sm font-semibold text-foreground">
            Wymagane do {requiredUntil}
          </p>

          <p className="text-xs text-muted-foreground">
            Śmierć {officerRank} {officerName}
          </p>
        </div>
      </div>
    </div>
  );
}
