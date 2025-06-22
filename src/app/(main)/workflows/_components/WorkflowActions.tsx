"use client"

import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import DeleteWorkflowDialog from "./DeleteWorkflowDialog";

const WorkflowActions = ({workflowId}:{workflowId : string}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
   <>
   <DeleteWorkflowDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} workflowId={workflowId}  />

   <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-0.5" variant={"outline"} size={"sm"}>
          <TooltipWrapper content={"More actions"}>
            <MoreVerticalIcon size={18} />
          </TooltipWrapper>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-center" align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive text-center gap-2"
          onSelect={() => {
            setShowDeleteDialog((prev) => !prev);
          }}
        >
          <Trash2Icon /> delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};

export default WorkflowActions;
