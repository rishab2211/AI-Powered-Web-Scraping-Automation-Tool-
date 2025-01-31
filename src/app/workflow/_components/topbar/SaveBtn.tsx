"use client";
import { UpdateWorkflow } from "@/actions/workflows/updateWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const SaveBtn = ({workflowId}:{workflowId : string }) => {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess : ()=>{
        toast.success("workflow saved successfully", {id : "save-workflow"})
    },
    onError:()=>{
        toast.error("Error occured while saving workflow",{id : "save-workflow"})
    }
  })

  return (
    <Button
      className="hover:shadow-xl"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("Saving workflow", {id : "save-workflow"});
        saveMutation.mutate({
            id : workflowId,
            definition : workflowDefinition
        })
      }}
    >
      <CheckIcon />
      Save
    </Button>
  );
};

export default SaveBtn;
