import { CustomNode } from "@/app/types/appNode";
import { TaskType } from "@/app/types/tasks";

export function CreateFlowNode(
    nodeType : TaskType,
    position?: {x:number, y:number}
): CustomNode{
    return({
        id : crypto.randomUUID(),
        position:position ?? {x:50, y:50},
        type:"Node",
        data :{
            type : nodeType,
            inputs : {}
        },
        dragHandle : ".drag-handle"
    })
}