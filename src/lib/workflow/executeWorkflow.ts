import "server-only";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/app/types/Workflows";
import { waitFor } from "../helper";
import { ExecutionPhase } from "@prisma/client";
import { CustomNode } from "@/app/types/appNode";
import { TaskRegistry } from "./task/Registry";
import { ExecutorRegistry } from "./executor/registry";
import { Environment } from "@/app/types/executor";

export async function ExecuteWorkflow(executionId: string) {


    const execution = await prisma.workflowExecution.findUnique({
        where: { id: executionId },
        include: { workflow: true, phases: true },
    });




    if (!execution) {
        throw new Error("Execution not found");
    }

    //  Setup execution environment

    const environment: Environment = {
        phases: {},
    }




    // initialize the workflow execution
    await intializeWorkflowExecution(executionId, execution.workflowId);



    // initialize phases status
    await initializePhaseStatuses(execution);




    // credits consumed
    let creditsConsumed = 0;
    let executionFailed = false;
    for (const phase of execution.phases) {
        // await waitFor(3000);
        // execute phase

        const phaseExecution = await executeWorkflowPhase(phase, environment);

        if (!phaseExecution.success) {
            executionFailed = true;
            break;
        }
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
    }).catch();



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
    }).catch();


}


async function executeWorkflowPhase(phase: ExecutionPhase, environment: Environment) {
    const startedAt = new Date();

    const node = JSON.parse(phase.node) as CustomNode;
    setupEnvironmentForPhase(node, environment);

    await prisma.executionPhase.update({
        where: {
            id: phase.id
        },
        data: {
            status: ExecutionPhaseStatus.RUNNING,
            startedAt
        }
    });

    const creditsRequired = TaskRegistry[node.data.type].credits;

    console.log(`Executing phase ${phase.name} with ${creditsRequired} credtis required`);


    // TODO : decrement  user balance (with required credits)


    // Execute phase 
    const success = await executePhase(phase, node, environment);

    await finalizePhase(phase.id, success);

    return { success };
}


async function finalizePhase(phaseId: string, success: boolean) {

    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED;

    await prisma.executionPhase.update({
        where: {
            id: phaseId
        },
        data: {
            status: finalStatus,
            completedAt: new Date()
        }
    })
}


async function executePhase(phase: ExecutionPhase, node: CustomNode, environment: Environment): Promise<boolean> {

    const runFn = ExecutorRegistry[node.data.type];
    if (!runFn) {
        return false;
    }


    return await runFn(environment);
}


async function setupEnvironmentForPhase(node: CustomNode, environment: Environment) {

    environment.phases[node.id] = { inputs: {}, outputs: {} };

    const inputs = TaskRegistry[node.data.type].inputs;

    for (const input of inputs) {
        const inputValue = node.data.inputs[input.name];

        if (inputValue) {
            environment.phases[node.id].inputs[input.name] = inputValue;
            continue;
        }

        // Get input value from outputs
    }

}