"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const DeleteCredential = async (name: string) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthenticated");
        }

        const result = await prisma.credential.delete({
            where: {
                userId_name: {
                    userId,
                    name
                }
            }
        })

        console.log("RESULT OF DELETING : ", result)

        revalidatePath("/credentials")
    } catch (err: any) {
        throw new Error("Error occured while deleting credential: ", err.message)
    }








}