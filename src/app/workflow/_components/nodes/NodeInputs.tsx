import { TaskParam } from "@/app/types/tasks";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";
import StringParam from "./param/StringParam";

const NodeInputs = ({ children }: { children: React.ReactNode }) => {
  return <div className=" flex flex-col divide-y gap-2 ">{children}</div>;
};

export function NodeInput({ input, nodeId }: { input: TaskParam, nodeId : string }) {
  return (
    <div className=" flex justify-start relative p-3 bg-secondary w-full ">
      <NodeParamField param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            " !bg-muted-foreground !border-2 !border-background !left-2 !w-4 !h-4 "
          )}
        />
      )}
    </div>
  );
}
export default NodeInputs;
