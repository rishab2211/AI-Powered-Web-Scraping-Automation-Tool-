"use server"

import { Period } from "@/app/types/analytics";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export async function GetPeriods() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthenticated");
    }

    const years = await prisma.workflowExecution.aggregate({
        where: {
            userId
        },
        _min: { startedAt: true }
    });

    const currentYear = new Date().getFullYear();

    const minYear = years._min.startedAt ? years._min.startedAt.getFullYear() : currentYear;

    const periods: Period[] = [];
    for (let yr = minYear; yr <= currentYear; yr++) {
        for (let mon = 0; mon <= 11; mon++) {
            periods.push({ year: yr, month: mon })
        }
    }

    return periods;
}