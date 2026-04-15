"use client";

import { useActionState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export default function OnboardingForm({
  defaultNickname = "",
  discordUsername,
  displayName,
}: Props) {
  const [state, formAction, isPending] = useActionState(
    completeOnboarding,
    initialState,
  );

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Ustaw swoje konto</CardTitle>
        <CardDescription>
          Wprowadź dane dotyczące twojego konta by przejść dalej
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="discord">Discord</Label>
            <Input id="discord" value={discordUsername} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">Nick OOC</Label>
            <Input
              id="nickname"
              name="nickname"
              defaultValue={defaultNickname}
              placeholder="Wprowadź swój nick"
              minLength={3}
              maxLength={32}
              required
            />
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
