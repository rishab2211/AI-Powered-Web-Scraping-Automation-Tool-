"use client"
import { PublishWorkflow } from "@/actions/workflows/publishWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { UploadIcon } from "lucide-react";
import { toast } from "sonner";

const PublishBtn = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow published.", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("Error occured while publishing workflow", {
        id: "flow-execution",
      });
    },
  });
  return (
    <Button
      className="hover:shadow-xl"
      onClick={() => {
        const plan = generate();
        if (!plan) {
          // client side validation
          return;
        }

        saveMutation.mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
      disabled={saveMutation.isPending}
    >
      <UploadIcon />
      Publish
    </Button>
  );
};

export default PublishBtn;
