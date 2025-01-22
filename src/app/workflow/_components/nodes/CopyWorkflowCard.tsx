import { CustomNode } from "@/app/types/appNode";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { useReactFlow } from "@xyflow/react";
import { CopyIcon } from "lucide-react";
import React from "react";

const CopyWorkflowCardBtn = ({nodeId}:{nodeId : string}) => {
  const { getNode, addNodes } = useReactFlow();

  const copyNode = (nodeId: string) => {
    const node = getNode(nodeId) as CustomNode;
    const newX = node.position.x-10;
    const newY = node.position.y+10;

    const newNode = CreateFlowNode(node.data.type, { x: newX, y: newY });
    addNodes([newNode])
  };
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant={"ghost"}
              size={"icon"}
              className=" hover:shadow-md"
              onClick={() => {
                copyNode(nodeId);
              }}
            >
              <CopyIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-primary m-2 text-secondary px-2 py-1 rounded">
            copy
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CopyWorkflowCardBtn;
