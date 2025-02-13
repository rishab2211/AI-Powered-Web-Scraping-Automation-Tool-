import { CustomNode } from "@/app/types/appNode";
import { ExecutionPhase } from "@prisma/client";
import { intervalToDuration } from "date-fns";
import { TaskRegistry } from "./workflow/task/Registry";

export function waitFor(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function DatesToDurationString(
    end: Date | null | undefined,
    start: Date | null | undefined,
) {
    if (!start || !end) {
        return null;
    }
    const timeElapsed = end.getTime() - start.getTime();

    if (timeElapsed < 1000) {
        // less than 1 second
        return `${timeElapsed}ms`;
    }

    const duration = intervalToDuration({
        start: 0,
        end: timeElapsed
    })

    return `${duration.minutes || 0}min ${duration.seconds || 0}sec`
}


type Phase = Pick<ExecutionPhase, "creditCost">;

export function GetPhasesTotalCost(phases: Phase[]) {

    return phases.reduce((acc, phase) => acc + (phase.creditCost || 0), 0);
}


export function CalculateWorkflowCost(nodes: CustomNode[]) {
    return nodes.reduce((acc, node) => {
        return acc + TaskRegistry[node.data.type].credits;
    },0)
}


export function getAppUrl(path : string){
    
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    
    return `${appUrl}/${path}`
}