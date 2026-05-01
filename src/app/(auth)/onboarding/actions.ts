"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type ActionState = {
  error?: string;
};

const schema = z.object({
  oocNickname: z
    .string()
    .trim()
    .min(3, "Nick OOC musi mieć minimum 3 znaki.")
    .max(50, "Nick OOC może mieć maksymalnie 50 znaków."),

  icNickname: z
    .string()
    .trim()
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

  yearsOfService: z.coerce
    .number()
    .int()
    .min(0, "Lata służby nie mogą być ujemne.")
    .max(40, "Maksymalnie 40 lat służby."),
});

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function completeOnboarding(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Musisz być zalogowany." };
  }

  const parsed = schema.safeParse({
    oocNickname: getString(formData, "oocNickname"),
    icNickname: getString(formData, "icNickname"),
    phoneNumber: getString(formData, "phoneNumber"),
    rank: getString(formData, "rank"),
    division: getString(formData, "division"),
    specialization: getString(formData, "specialization") || undefined,
    yearsOfService: getString(formData, "yearsOfService"),
  });

  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message ?? "Nieprawidłowe dane formularza.",
    };
  }

  const data = parsed.data;

  const existingNickname = await prisma.user.findFirst({
    where: {
      nickname: {
        equals: data.oocNickname,
        mode: "insensitive",
      },
      id: {
        not: session.user.id,
      },
    },
    select: { id: true },
  });

  if (existingNickname) {
    return { error: "Ten nick OOC jest już zajęty." };
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: session.user.id },
      data: {
        nickname: data.oocNickname,
        isOnboarded: true,
      },
    });

    await tx.characterApplication.create({
      data: {
        userId: session.user.id,
        oocNickname: data.oocNickname,
        characterName: data.icNickname,
        phoneNumber: data.phoneNumber,
        rank: data.rank,
        division: data.division,
        specialization: data.specialization ?? null,
        yearsOfService: data.yearsOfService,
      },
    });
  });

  redirect("/dashboard");
}
