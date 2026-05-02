import { ActiveRecruitmentsCard } from "@/components/dashboard/ActiveRecruitments";
import { DutyTimeCard } from "@/components/dashboard/DutyTimeCard";
import { MourningNoticeCard } from "@/components/dashboard/MourningNoticeCard";
import { PatrolAssignmentCard } from "@/components/dashboard/PatrolAssignmentCard";
import { PendingApplicationCard } from "@/components/dashboard/PendingApplicationCard";
import { PageHeader } from "@/components/navigation/PageHeader";

export default async function DashboardPage() {
  const recruitments = [
    {
      id: "1",
      divisionName: "Gang Enforcement Detail",
      deadline: new Date("2026-05-15"),
    },
    {
      id: "2",
      divisionName: "Traffic Division",
      deadline: new Date("2026-05-20"),
    },
    {
      id: "3",
      divisionName: "Air Support Division",
      deadline: new Date("2026-05-10"),
    },
    {
      id: "4",
      divisionName: "Detective Bureau",
      deadline: new Date("2026-05-25"),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Sprawdź podstawowe informacje o swojej postaci i aktywności."
        action={
          <MourningNoticeCard
            officerRank="Police Officer II"
            officerName="John Smith"
            requiredUntil="20 Maj 2026"
          />
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_430px]">
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <DutyTimeCard
              minutesThisWeek={200}
              days={[
                { label: "Pon", minutes: 45 },
                { label: "Wt", minutes: 10 },
                { label: "Śr", minutes: 75 },
                { label: "Czw", minutes: 55 },
                { label: "Pt", minutes: 230 },
                { label: "Sob", minutes: 15 },
                { label: "Nd", minutes: 20 },
              ]}
            />

            <PatrolAssignmentCard
              vehicleModel="Scout 2020"
              vehicleUid="28273"
              division="MRD"
              specialization="GED"
              officers={[
                {
                  id: "1",
                  rank: "Officer II",
                  characterName: "John Automatic",
                  oocNickname: "Wolny.",
                },
                {
                  id: "2",
                  rank: "Officer II",
                  characterName: "Jayden Puma",
                  oocNickname: "krop",
                },
              ]}
            />
          </div>

          <ActiveRecruitmentsCard recruitments={recruitments} />
        </div>

        <div className="space-y-4">
          <PendingApplicationCard
            firstName="John"
            lastName="Smith"
            rank="Police Officer II"
            division="MRD"
            specialization="GED"
            yearsOfService={3}
          />
        </div>
      </div>
    </div>
  );
}
