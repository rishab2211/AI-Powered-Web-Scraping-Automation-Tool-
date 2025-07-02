"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"


export const GetCredentialsForUser = async () => {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthenticated")
        }

        const credentials = await prisma.credential.findMany({
            where: { userId: userId },
            orderBy: {
                name: "asc"
            }
        })
        return credentials;
    } catch (err: any) {
        throw new Error("ERROR OCCURED WHILE FERCHING CREDENTIALS : ", err.message)
    }
}