"use client";
import { RunWorkflow } from "@/actions/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ExecuteBtn = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();
  const {toObject} = useReactFlow();
  const {nodes , edges} = toObject();

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Execution started", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("Some error occured while starting workflow", { id: "flow-execution" });
    },
  });

  const isValid = nodes.length > 0;

  return (
    <Button
      variant={"outline"}
      className="flex items-center justify-center"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if(!plan){
          // client side validation
          return;
        };

        if(!isValid){
          toast.error("Add nodes before executing");
          return;
        }
        mutation.mutate({
          workflowId : workflowId,
          flowDefinition : JSON.stringify({nodes, edges})
        })

      }}
      
      
    >
      <PlayIcon />
      Execute
    </Button>
  );
};

export default ExecuteBtn;
