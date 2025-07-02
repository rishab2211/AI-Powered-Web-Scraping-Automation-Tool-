"use server"

import { WorkflowStatus } from "@/app/types/Workflows";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export async function UpdateWorkflow({ id, definition }: { id: string, definition: string }) {

    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthenticated");
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id,
            userId
        }
    });

    if (!workflow) {
        throw new Error("workflow not found");
    }
    if (workflow.status !== WorkflowStatus.DRAFT) {
        throw new Error("workflow is not a draft")
    }

    await prisma.workflow.update({
        data:{
            definition,
        },
        where:{
            id,
            userId
        }
    })
}