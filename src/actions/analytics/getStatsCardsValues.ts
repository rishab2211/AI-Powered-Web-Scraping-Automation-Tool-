"use server"
import { Period } from "@/app/types/analytics";
import { WorkflowExecutionStatus } from "@/app/types/Workflows";
import { PeriodToDateRange } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetStatsCardsValues(selectedPeriod: Period) {

    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthenticated")
    }
    const dateRange = PeriodToDateRange(selectedPeriod);
    const executions = await prisma.workflowExecution.findMany({
        where: {
            userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate
            },
            status: {
                in: [WorkflowExecutionStatus.COMPLETED, WorkflowExecutionStatus.FAILED]
            }
        },
        select: {
            creditsConsumed: true,
            phases: {
                where: {
                    creditCost: {
                        not: null
                    }
                },
                select: {
                    creditCost: true
                }
            }
        }
    })
    const stats = {
        workflowExecutions: executions.length,
        creditsConsumed: 0,
        phaseExecutions: 0
    }

    stats.creditsConsumed = executions.reduce((sum, execution) =>
        sum + execution.creditsConsumed, 0
    )

    stats.phaseExecutions = executions.reduce((sum, execution) =>
        sum + execution.phases.length, 0
    )

    return stats;
}

