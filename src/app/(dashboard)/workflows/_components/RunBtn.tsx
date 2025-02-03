"use client";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { UnPublishWorkflow } from "@/actions/workflows/unPublishWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import {  PlayIcon} from "lucide-react";
import { toast } from "sonner";

const RunBtn = ({ workflowId }: { workflowId: string }) => {
  const saveMutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Workflow scheduled to run successfully.", { id: workflowId });
    },
    onError: () => {
      toast.error("Some error have occured while starting.", {
        id: workflowId,
      });
    },
  });
  return (
    <Button
      className="hover:shadow-xl"
      onClick={() => {
        toast.loading("Scheduling run...", { id: workflowId });

        saveMutation.mutate({workflowId});
      }}
      variant={"outline"}
      disabled={saveMutation.isPending}
      size={"sm"}
    >
      <PlayIcon />
      Run
    </Button>
  );
};

export default RunBtn;
