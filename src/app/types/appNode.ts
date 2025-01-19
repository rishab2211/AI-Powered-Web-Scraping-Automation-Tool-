import { Node } from "@xyflow/react";
import { TaskType } from "./tasks";



export interface CustomNodeData{
    type: TaskType;
    inputs : Record<string,string>;
    [key : string] : any;
}

export interface CustomNode extends Node{
    data : CustomNodeData
}