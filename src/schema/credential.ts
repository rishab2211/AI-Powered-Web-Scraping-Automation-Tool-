import z from "zod"

export const createCredentialSchema = z.object({
    name: z.string().max(30),
    value: z.string().max(50)
})

export type createCredentialSchemaType = z.infer<typeof createCredentialSchema>