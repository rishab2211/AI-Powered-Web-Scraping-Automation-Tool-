"use server"
import { WorkflowStatus } from "@/app/types/Workflows";
import { CalculateWorkflowCost } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/FlowToExecutionPlan";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function PublishWorkflow({ id, flowDefinition }: { id: string, flowDefinition: string }) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error('unauthenticated');
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id,
            userId
        },
    });

    if (!workflow) {
        throw new Error("workflow not found");
    }

    if (workflow.status !== WorkflowStatus.DRAFT) {
        throw new Error("Workflow is already published");
    }

    const flow = JSON.parse(flowDefinition);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);

    if (result.error) {
        throw new Error("flow definition not valid");
    }

    if (!result.executionPlan) {
        throw new Error("no execution plan generated");
    }

    const creditCost = CalculateWorkflowCost(flow.nodes);

    await prisma.workflow.update({
        where: {
            id,
            userId
        },
        data: {
            definition: flowDefinition,
            executionPlan: JSON.stringify(result.executionPlan),
            creditCost,
            status: WorkflowStatus.PUBLISHED
        }
    });

    revalidatePath(`/workflow/editor/${id}`)
}