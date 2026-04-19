"use client";

import { useActionState, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { completeOnboarding } from "../actions";

type Props = {
  defaultNickname?: string;
  discordUsername: string;
  displayName: string;
};

const initialState = {
  error: "",
};

const lapdRanks = [
  "Police Officer I",
  "Police Officer II",
  "Police Officer III",
  "Detective I",
  "Detective II",
  "Detective III",
  "Sergeant I",
  "Sergeant II",
  "Lieutenant I",
  "Lieutenant II",
  "Captain I",
  "Captain II",
  "Captain III",
  "Commander",
  "Deputy Chief",
  "Assistant Chief",
  "Chief of Police",
];

const lspdDivisions = [
  "Mission Row Division",
  "Metropolitian Division",
  "Detective Bureau",
  "Traffic Division",
];

const lspdSpecialization = [
  "Gang Enforcement Division",
  "Area Detectives",
  "Robbery Homicide Division",
];

export default function OnboardingForm({
  defaultNickname = "",
  discordUsername,
  displayName: _displayName,
}: Props) {
  const [state, formAction, isPending] = useActionState(
    completeOnboarding,
    initialState,
  );
  const [selectedRank, setSelectedRank] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [isDivisionMenuOpen, setIsDivisionMenuOpen] = useState(false);
  const [isSpecializationMenuOpen, setIsSpecializationMenuOpen] =
    useState(false);
  const [isRankMenuOpen, setIsRankMenuOpen] = useState(false);

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Ustaw swoje konto</CardTitle>
        <CardDescription>
          Wprowadź dane dotyczące twojego konta do weryfikacji
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="discord">Discord</Label>
            <Input id="discord" value={discordUsername} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="oocNickname">Nick OOC</Label>
            <Input
              id="oocNickname"
              name="nickname"
              defaultValue={defaultNickname}
              placeholder="np. c40px2_"
              minLength={3}
              maxLength={50}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icNickname">Nick IC postaci</Label>
            <Input
              id="icNickname"
              name="nickname"
              placeholder="np. John Smith (pomiń środkowe imię)"
              minLength={5}
              maxLength={50}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Numer telefonu postaci</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="np. 811-212-3937"
              minLength={10}
              maxLength={10}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rank">Stopień</Label>
            <input type="hidden" id="rank" name="rank" value={selectedRank} />

            <DropdownMenu
              open={isRankMenuOpen}
              onOpenChange={setIsRankMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between rounded-3xl"
                >
                  <span className={selectedRank ? "" : "text-muted-foreground"}>
                    {selectedRank || "Wybierz stopień swojej postaci"}
                  </span>
                  {isRankMenuOpen ? (
                    <ChevronUp className="text-muted-foreground size-4" />
                  ) : (
                    <ChevronDown className="text-muted-foreground size-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                <DropdownMenuRadioGroup
                  value={selectedRank}
                  onValueChange={setSelectedRank}
                >
                  {lapdRanks.map((rank) => (
                    <DropdownMenuRadioItem key={rank} value={rank}>
                      {rank}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <Label htmlFor="division">Dywizja</Label>
            <input
              type="hidden"
              id="division"
              name="division"
              value={selectedDivision}
            />

            <DropdownMenu
              open={isDivisionMenuOpen}
              onOpenChange={setIsDivisionMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between rounded-3xl"
                >
                  <span
                    className={selectedDivision ? "" : "text-muted-foreground"}
                  >
                    {selectedDivision ||
                      "Wybierz dywizję, do której należy postać"}
                  </span>
                  {isDivisionMenuOpen ? (
                    <ChevronUp className="text-muted-foreground size-4" />
                  ) : (
                    <ChevronDown className="text-muted-foreground size-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                <DropdownMenuRadioGroup
                  value={selectedDivision}
                  onValueChange={setSelectedDivision}
                >
                  {lspdDivisions.map((division) => (
                    <DropdownMenuRadioItem key={division} value={division}>
                      {division}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specjalizacja</Label>
            <input
              type="hidden"
              id="specialization"
              name="specialization"
              value={selectedSpecialization}
            />

            <DropdownMenu
              open={isSpecializationMenuOpen}
              onOpenChange={setIsSpecializationMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between rounded-3xl"
                >
                  <span
                    className={
                      selectedSpecialization ? "" : "text-muted-foreground"
                    }
                  >
                    {selectedSpecialization || "Wybierz specjalizację postaci"}
                  </span>
                  {isSpecializationMenuOpen ? (
                    <ChevronUp className="text-muted-foreground size-4" />
                  ) : (
                    <ChevronDown className="text-muted-foreground size-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                <DropdownMenuRadioGroup
                  value={selectedSpecialization}
                  onValueChange={setSelectedSpecialization}
                >
                  {lspdSpecialization.map((specialization) => (
                    <DropdownMenuRadioItem
                      key={specialization}
                      value={specialization}
                    >
                      {specialization}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {state?.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Zapisywanie..." : "Kontynuuj"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
