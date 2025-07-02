"use server"
import { PackId } from "@/app/types/billing";
import { auth } from "@clerk/nextjs/server";

export async function PurchaseCredits(packId : PackId) {
    const {userId} = await auth();
    if(!userId){
        throw new Error("Unauthenticated")
    }

    
}