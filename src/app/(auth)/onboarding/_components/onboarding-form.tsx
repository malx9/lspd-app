"use client";

import { useActionState, useMemo, useState, useTransition } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { completeOnboarding } from "../actions";
import Image from "next/image";

type Props = {
  defaultNickname?: string;
  discordUsername: string;
  displayName: string;
  image?: string | null;
};

const initialState = { error: "" };

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
] as const;

const lspdDivisions = [
  "Mission Row Division",
  "Metropolitian Division",
  "Detective Bureau",
  "Traffic Division",
] as const;

const specializationByDivision: Record<string, string[]> = {
  "Mission Row Division": ["Gang Enforcement Detail"],
  "Detective Bureau": ["Area Detectives", "Robbery Homicide Division"],
  "Traffic Division": [],
  "Metropolitian Division": [],
};

const schema = z.object({
  oocNickname: z
    .string()
    .min(3, "Nick OOC musi mieć minimum 3 znaki.")
    .max(40, "Nick OOC może mieć maksymalnie 40 znaków."),

  icNickname: z
    .string()
    .min(5, "Nick IC musi mieć minimum 5 znaków.")
    .max(40, "Nick IC może mieć maksymalnie 40 znaków.")
    .regex(
      /^[a-zA-Z\s-]+$/,
      "Nick IC może zawierać tylko zwykłe litery, spacje i myślnik.",
    )
    .refine((value) => {
      const parts = value.trim().split(/\s+/);
      return parts.length >= 2 && parts.length <= 3;
    }, "Podaj imię i nazwisko. Środkowe imię jest opcjonalne."),

  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Numer telefonu musi mieć dokładnie 10 cyfr."),

  rank: z.string().min(1, "Wybierz stopień."),

  division: z.string().min(1, "Wybierz dywizję."),

  specialization: z.string().optional(),

  yearsOfService: z
    .string()
    .min(1, "Podaj lata służby.")
    .regex(/^\d+$/, "Lata służby mogą zawierać tylko cyfry.")
    .refine((v) => Number(v) <= 40, "Maksymalnie 40 lat służby."),
});

type FormValues = z.infer<typeof schema>;

function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function OnboardingForm({
  defaultNickname = "",
  discordUsername,
  image,
}: Props) {
  const [state, formAction] = useActionState(completeOnboarding, initialState);
  const [isPending, startTransition] = useTransition();

  const [isRankOpen, setIsRankOpen] = useState(false);
  const [isDivisionOpen, setIsDivisionOpen] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      oocNickname: defaultNickname,
      icNickname: "",
      phoneNumber: "",
      rank: "",
      division: "",
      specialization: "",
      yearsOfService: "",
    },
  });

  const division = form.watch("division");
  const rank = form.watch("rank");
  const specialization = form.watch("specialization");

  const specs = useMemo(
    () => specializationByDivision[division] ?? [],
    [division],
  );

  function onSubmit(values: FormValues) {
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.set(k, v ?? ""));

    startTransition(() => formAction(fd));
  }

  function formatCharacterName(value: string) {
    return value
      .replace(/[^a-zA-Z\s-]/g, "")
      .replace(/\s+/g, " ")
      .split(" ")
      .map((part) => {
        if (!part) return part;

        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      })
      .join(" ")
      .slice(0, 40);
  }

  function sanitizeCharacterName(value: string) {
    return value
      .replace(/[^a-zA-Z\s-]/g, "")
      .replace(/\s{2,}/g, " ")
      .slice(0, 40);
  }

  function shouldShowError({
    value,
    isTouched,
    isSubmitted,
  }: {
    value: unknown;
    isTouched: boolean;
    isSubmitted: boolean;
  }) {
    if (isSubmitted) return true;

    if (typeof value === "string") {
      return isTouched && value.trim().length > 0;
    }

    return isTouched;
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="relative size-12 overflow-hidden rounded-full border border-border bg-muted">
            {image ? (
              <Image
                src={image}
                alt={discordUsername}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-sm font-semibold">
                {discordUsername.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <CardTitle>Ustaw swoje konto</CardTitle>
            <CardDescription>
              Wprowadź dane dotyczące twojego konta do weryfikacji
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldLabel>Discord username</FieldLabel>
          <Input value={discordUsername} disabled />

          {/* OOC */}
          <Controller
            name="oocNickname"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nick OOC</FieldLabel>
                <Input
                  {...field}
                  placeholder="Twój nick OOC, którego używasz na forum"
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* IC */}
          <Controller
            name="icNickname"
            control={form.control}
            render={({ field, fieldState }) => {
              const showError = shouldShowError({
                value: field.value,
                isTouched: fieldState.isTouched,
                isSubmitted: form.formState.isSubmitted,
              });

              return (
                <Field data-invalid={showError && fieldState.invalid}>
                  <FieldLabel>Nick IC postaci</FieldLabel>

                  <Input
                    id={field.name}
                    value={field.value}
                    onChange={(event) => {
                      field.onChange(sanitizeCharacterName(event.target.value));
                    }}
                    onBlur={() => {
                      field.onChange(formatCharacterName(field.value));
                      field.onBlur();
                    }}
                    placeholder="np. John Smith"
                    autoComplete="off"
                    maxLength={40}
                    aria-invalid={showError && fieldState.invalid}
                  />

                  <p className="text-xs text-muted-foreground">
                    {field.value.length}/40 znaków
                  </p>

                  {showError ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </Field>
              );
            }}
          />

          {/* PHONE */}
          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Telefon</FieldLabel>
                <Input
                  value={formatPhone(field.value)}
                  placeholder="np. 011-222-3344"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.replace(/\D/g, "").slice(0, 10),
                    )
                  }
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* RANK */}
          <Controller
            name="rank"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Stopień</FieldLabel>

                <DropdownMenu open={isRankOpen} onOpenChange={setIsRankOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {rank || "Wybierz stopień"}
                      {isRankOpen ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {lapdRanks.map((r) => (
                        <DropdownMenuRadioItem key={r} value={r}>
                          {r}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* DIVISION */}
          <Controller
            name="division"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Dywizja</FieldLabel>

                <DropdownMenu
                  open={isDivisionOpen}
                  onOpenChange={setIsDivisionOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {division || "Wybierz dywizję"}
                      {isDivisionOpen ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={field.value}
                      onValueChange={(v) => {
                        field.onChange(v);
                        form.setValue("specialization", "");
                      }}
                    >
                      {lspdDivisions.map((d) => (
                        <DropdownMenuRadioItem key={d} value={d}>
                          {d}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* SPECIALIZATION */}
          <Controller
            name="specialization"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Specjalizacja</FieldLabel>

                <DropdownMenu open={isSpecOpen} onOpenChange={setIsSpecOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      disabled={!division || specs.length === 0}
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {specialization || "Wybierz specjalizację"}
                      {isSpecOpen ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {specs.map((s) => (
                        <DropdownMenuRadioItem key={s} value={s}>
                          {s}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* YEARS */}
          <Controller
            name="yearsOfService"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Lata służby</FieldLabel>
                <Input
                  value={field.value}
                  placeholder="np. 10"
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "").slice(0, 2);
                    if (v && Number(v) > 40) v = "40";
                    field.onChange(v);
                  }}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Zapisywanie..." : "Kontynuuj"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
