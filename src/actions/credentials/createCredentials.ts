"use server"

import { symmetricEncrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { createCredentialSchema, createCredentialSchemaType } from "@/schema/credential"
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const CreateCredential = async (form: createCredentialSchemaType) => {
    const { success, data } = await createCredentialSchema.safeParse(form);
    if (!success) {
        throw new Error("Invalid form data");
    }

    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthenticated");
    }

    // Encrypt value
    const encrypttedValue = symmetricEncrypt(data.value);
    console.log("@TESTING",{
        plain : data.value,
        encrypted : encrypttedValue
    });
    
    const result = await prisma.credential.create({
        data: {
            userId,
            name: data.name,
            value: encrypttedValue
        }
    });

    if(!result){
        throw new Error("Failed to create credentials")
    }

    revalidatePath("/credentials")
}