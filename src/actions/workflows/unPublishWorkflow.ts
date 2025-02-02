"use server"
import { WorkflowStatus } from "@/app/types/Workflows";
import { CalculateWorkflowCost } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/FlowToExecutionPlan";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function UnPublishWorkflow( id: string ) {
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

    if (workflow.status !== WorkflowStatus.PUBLISHED) {
        throw new Error("Workflow is already a draft");
    }

    
    await prisma.workflow.update({
        where: {
            id,
            userId
        },
        data: {
            status: WorkflowStatus.DRAFT,
            executionPlan : null,
            creditCost : 0,
            
        }
    });

    revalidatePath(`/workflow/editor/${id}`)
}