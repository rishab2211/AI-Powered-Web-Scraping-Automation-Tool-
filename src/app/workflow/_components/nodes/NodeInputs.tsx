import { TaskParam } from "@/app/types/tasks";
import { cn } from "@/lib/utils";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";
import StringParam from "./param/StringParam";
import { ColorForHandle } from "./Common";
import useFlowValidation from "@/components/hooks/useFlowValidation";

const NodeInputs = ({ children }: { children: React.ReactNode }) => {
  return <div className=" flex flex-col divide-y gap-2 ">{children}</div>;
};

export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) {
  const { invalidInputs } = useFlowValidation();
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInputs) => invalidInputs === input.name);

  return (
    <div className = {cn(" flex justify-start relative p-3 bg-secondary w-full ", 
      hasErrors && "bg-destructive/30 "
    )}>
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            " !bg-muted-foreground !border-2 !border-background !w-4 !h-4 ",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
}
export default NodeInputs;
