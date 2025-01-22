"use client";

import { TaskParam } from "@/app/types/tasks";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import { ColorForHandle } from "./Common";

const NodeOutputs = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col">{children}</div>;
};

export default NodeOutputs;

export function NodeOutput({ output }: { output: TaskParam }) {
  return (
    <div className="flex justify-end p-3 bg-secondary border-y-2 border-y-white gap-1 ">
      <p className=" text-xs text-muted-foreground  ">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !relative !border-2 !-right-3 !-bottom-2 !border-background !w-4 !h-4",
          ColorForHandle[output.type]
        )}
      /> 
    </div>
  );
}


