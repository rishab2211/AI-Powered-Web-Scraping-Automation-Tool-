"use server"

import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow"
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/app/types/Workflows";
import { redirect } from "next/navigation";
export async function createWorkflow(form: createWorkflowSchemaType) {
    const { success, data } = createWorkflowSchema.safeParse(form);

    if (!success) {
        throw new Error("Invalid form data");
    }

    const { userId } = await auth();


    if (!userId) {
        throw new Error("Unauthenticated");
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            definition: "TODO",
            ...data,
            status:WorkflowStatus.DRAFT
        }
    })

    if(!result){
        throw new Error("failed to create workflow")
    }

    console.log(result);
    
    return result;
}