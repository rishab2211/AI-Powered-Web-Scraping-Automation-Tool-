"use client";
import { UnPublishWorkflow } from "@/actions/workflows/unPublishWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon} from "lucide-react";
import { toast } from "sonner";

const UnPublishBtn = ({ workflowId }: { workflowId: string }) => {
  const saveMutation = useMutation({
    mutationFn: UnPublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow unpublished.", { id: workflowId });
    },
    onError: () => {
      toast.error("Error occured while unpublishing workflow", {
        id: workflowId,
      });
    },
  });
  return (
    <Button
      className="hover:shadow-xl"
      onClick={() => {
        toast.loading("Unpublishing workflow...", { id: workflowId });

        saveMutation.mutate(workflowId);
      }}
      disabled={saveMutation.isPending}
    >
      <DownloadIcon />
      Unpublish
    </Button>
  );
};

export default UnPublishBtn;
