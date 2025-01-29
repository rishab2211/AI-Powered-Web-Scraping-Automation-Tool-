import { ExecutionPhase } from "@prisma/client";
import { intervalToDuration } from "date-fns";

export function waitFor(ms:number){
    return new Promise((resolve)=>setTimeout(resolve, ms))
}

export function DatesToDurationString(
    end : Date | null | undefined,
    start : Date | null | undefined,
){
    if(!start || !end){
        return null;
    }
    const timeElapsed = end.getTime() - start.getTime();

    if(timeElapsed<1000){
     // less than 1 second
     return `${timeElapsed}ms`;
    }

    const duration = intervalToDuration({
        start : 0,
        end : timeElapsed
    })

    return `${duration.minutes || 0}min ${duration.seconds || 0}sec`
}


type Phase = Pick<ExecutionPhase, "creditCost">;

export function GetPhasesTotalCost(phases : Phase[]){

    return phases.reduce((acc, phase)=>acc + (phase.creditCost || 0), 0);
}