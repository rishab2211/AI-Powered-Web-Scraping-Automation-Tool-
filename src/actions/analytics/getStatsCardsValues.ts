"use server"
import { Period } from "@/app/types/analytics";
import { WorkflowExecutionStatus } from "@/app/types/Workflows";
import { PeriodToDateRange } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetStatsCardsValues(selectedPeriod: Period) {
    try {

        // authenticating user
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthenticated")
        }

        // gets first and last date of the selected period
        const dateRange = PeriodToDateRange(selectedPeriod);

        // selects workflow Executions which have been performed between dateRange of the user.
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

        // initializing stats object
        const stats = {
            workflowExecutions: executions.length,
            creditsConsumed: 0,
            phaseExecutions: 0
        }

        // getting the executions info in the stats object by reducing it
        stats.creditsConsumed = executions.reduce((sum, execution) =>
            sum + execution.creditsConsumed, 0
        ) 
        stats.phaseExecutions = executions.reduce((sum, execution) =>
            sum + execution.phases.length, 0
        )

        return stats;
    } catch (error) {
        throw new Error("Could not get the Stats card values")
    }
}

