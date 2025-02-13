"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import parser from "cron-parser";
import { revalidatePath } from "next/cache";
import { parse } from "path";

export async function UpdateCronWorkflow({ id, cron }: { id: string, cron: string }) {

    const { userId } = await auth();

    if (!userId) {
        throw new Error("unauthenticated");
    }

    try {

        const interval = parser.parseExpression(cron, {utc : true});


        await prisma.workflow.update({
            where: {
                id,
                userId
            },
            data: {
                cron,
                nextRunAt: interval.next().toDate(),
            }
        })
    }catch(err :any){
        console.error("invalid cron : ",err.message);
        throw new Error("invalid cron expression : ");
    }

    revalidatePath("/workflows")
}