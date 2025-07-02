import { WorkflowStatus } from "@/app/types/Workflows";
import { getAppUrl } from "@/lib/helper";
import prisma from "@/lib/prisma";


export async function GET(req: Request) {
    const now = new Date();
    const workflows = await prisma.workflow.findMany({
        select: { id: true },
        where: {
            status: WorkflowStatus.PUBLISHED,
            cron: { not: null },
            nextRunAt: { lte: now }
        }
    });

    
    for (const workflow of workflows) {
        triggerWorkflow(workflow.id);
    }

    return Response.json({workflowsToRun:workflows.length}, { status: 200 });
}


function triggerWorkflow(workflowId: string) {
    const triggerApiUrl = getAppUrl(`api/workflows/execute?workflowId=${workflowId}`);

    fetch(triggerApiUrl, {
        headers : {
            Authorization : `Bearer ${process.env.API_SECRET}`
        },
        cache: "no-store",
        signal: AbortSignal.timeout(15000)
    }).catch((error) => console.error("Error while triggering workglow with id : ", workflowId,"Error : ",error.message));

}