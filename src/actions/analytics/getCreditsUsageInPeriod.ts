import { Period } from "@/app/types/analytics";
import { PeriodToDateRange } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";
import { Stats } from "./getWorkflowExecutionStats";
import { ExecutionPhaseStatus } from "@/app/types/Workflows";


export async function GetCreditsUsageInPeriod(period: Period) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthenticated");
    }

    const dateRange = PeriodToDateRange(period);

    const executionPhases = await prisma.executionPhase.findMany({
        where: {
            userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate
            },
            status :{
                in : [ExecutionPhaseStatus.COMPLETED, ExecutionPhaseStatus.FAILED]
            }
        }
    });

    const dateFormat = "yyyy-MM-dd";

    const stats: Stats = eachDayOfInterval({
        start: dateRange.startDate,
        end: dateRange.endDate
    }).map((date) => format(date, dateFormat))
        .reduce((acc, date) => {
            acc[date] = {
                success: 0,
                failed: 0
            };
            return acc;
        }, {} as any);

    executionPhases.forEach(phase => {
        const date = format(phase.startedAt!, dateFormat);
        if (phase.status === ExecutionPhaseStatus.COMPLETED) {
            stats[date].success += phase.creditCost || 0;
        }
        if (phase.status === ExecutionPhaseStatus.FAILED) {
            stats[date].failed += phase.creditCost || 0;
        }
    })
    const result = Object.entries(stats).map(([date, infos]) => ({ date, ...infos }));

    return result;
}