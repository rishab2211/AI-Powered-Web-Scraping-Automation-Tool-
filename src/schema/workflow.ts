
import { z } from "zod"

export const createWorkflowSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(1,{message:"Name is required"}).max(50, { message: "The name hould not exceed more than 50 characters" }),
    description: z.string().max(100, { message: "Maximum 100 characters are allowed" }).optional()
})

export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;

export const duplicateWorkflowSchema = createWorkflowSchema.extend({
    workflowId : z.string(),
})

export type duplicateWorkflowSchemaType = z.infer<typeof duplicateWorkflowSchema>;