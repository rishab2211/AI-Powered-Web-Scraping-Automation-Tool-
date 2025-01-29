import "server-only";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/app/types/Workflows";
import { waitFor } from "../helper";

export async function ExecuteWorkflow(executionId: string) {


    const execution = await prisma.workflowExecution.findUnique({
        where: { id: executionId },
        include: { workflow: true, phases: true },
    });




    if (!execution) {
        throw new Error("Execution not found");
    }

    //  Setup execution environment

    const environment = {
        // phases: {
        //     launchBrowser : {
        //         inputs : {
        //             websiteUrl : "www.google.com",
        //         },
        //         outputs : {
        //             browser : "PuppeteerInstance",
        //         },
        //     },
        // },
    }




    // initialize the workflow execution
    await intializeWorkflowExecution(executionId, execution.workflowId);



    // initialize phases status
    await initializePhaseStatuses(execution);




    // credits consumed
    let creditsConsumed = 0;
    let executionFailed = false;
    for (const phase of execution.phases) {
        await waitFor(3000);
        // TODO : execute phase
    }

    // finalize execution
    await finalizeWorkflowExecution(executionId, execution.workflowId, executionFailed, creditsConsumed);
    // TODO : clean up environment

    revalidatePath("/workflow/runs")
}



async function intializeWorkflowExecution(executionId: string, workflowId: string) {

    await prisma.workflowExecution.update({
        where: { id: executionId },
        data: {
            startedAt: new Date(),
            status: WorkflowExecutionStatus.RUNNING,
        }
    });



    await prisma.workflow.update({
        where: {
            id: workflowId,
        },
        data: {
            lastRun: new Date(),
            lastRunStatus: WorkflowExecutionStatus.RUNNING,
            lastRunId: executionId
        },
    });



}


async function initializePhaseStatuses(execution: any) {
    await prisma.executionPhase.updateMany({
        where: {
            id: {
                in: execution.phases.map((phase: any) => phase.id)
            }
        },
        data: {
            status: ExecutionPhaseStatus.PENDING,
        }
    })


}




async function finalizeWorkflowExecution(executionId: string, workflowId: string, executionFailed: boolean, creditsConsumed: number) {

    const finalStatus = executionFailed ? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.COMPLETED;

    await prisma.workflowExecution.update({
        where: { id: executionId },
        data: {
            status: finalStatus,
            completedAt: new Date(),
            creditsConsumed
        }
    });


    await prisma.workflow.update({
        where: {
            id: workflowId,
            lastRunId: executionId
        },
        data: {
            lastRunStatus: finalStatus
        }
    })


}