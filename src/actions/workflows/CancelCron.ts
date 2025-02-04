"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import parser from "cron-parser";
import { parse } from "path";

export async function CancelCron({ id }: { id: string }) {

    const { userId } = await auth();

    if (!userId) {
        throw new Error("unauthenticated");
    }

    try {

        
        return await prisma.workflow.update({
            where: {
                id,
                userId
            },
            data: {
                cron : null
            }
        })
    }catch(err :any){
        console.error("invalid cron : ",err.message);
        throw new Error("invalid cron expression : ");
    }

    
}