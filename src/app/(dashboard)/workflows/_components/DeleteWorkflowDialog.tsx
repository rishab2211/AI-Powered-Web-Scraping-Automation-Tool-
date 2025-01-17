import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { DeleteWorkflow } from "@/actions/deleteWorkflow";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowId: string;
}

const DeleteWorkflowDialog = ({ open, setOpen, workflowId }: Props) => {
  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", { id: workflowId });
    },
    onError: () => {
      toast.error("Error ouccred while deleting workflow", { id: workflowId });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          If you delete this workflow, you will not be able to recover it.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteMutation.isPending}
            onClick={(e) => {
              e.stopPropagation();
              toast.loading("Deleting workflow...",{id : workflowId});
              deleteMutation.mutate(workflowId);
            }}
            className="bg-destructive hover:bg-destructive/50 hover:font-bold  "
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkflowDialog;
