
import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { CustomNodeData } from "@/app/types/appNode";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import NodeInputs, { NodeInput } from "./NodeInputs";
import NodeOutputs, { NodeOutput } from "./NodeOutputs";

const NodeComponent = memo((props:NodeProps)=>{

    const nodeData = props.data as CustomNodeData;

    const task = TaskRegistry[nodeData.type];

    return <NodeCard nodeId={props.id} isSelected={!!props.selected} >
        <NodeHeader taskType ={nodeData.type}/>
        <NodeInputs>
            {task.inputs.map((input,index)=>(
                <NodeInput input={input} nodeId={props.id} key={index}/>
            ))}
        </NodeInputs>

        <NodeOutputs>
            {task.outputs.map((output,index)=>(
                <NodeOutput output={output}  key={index}/>
            ))}
        </NodeOutputs>
    </NodeCard>
})

export default NodeComponent;

NodeComponent.displayName = "NodeComponent"