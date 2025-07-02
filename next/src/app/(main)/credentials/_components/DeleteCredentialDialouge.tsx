"use client"
import React, { useState } from "react";
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
import { DeleteWorkflow } from "@/actions/workflows/deleteWorkflow";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { DeleteCredential } from "@/actions/credentials/deleteCredentials";

interface Props {
  name: string;
}

const DeleteCredentialDialog = ({ name }: Props) => {
  const [open, setOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: DeleteCredential,
    onSuccess: () => {
      toast.success("Credential deleted successfully", { id: name });
    },
    onError: () => {
      toast.error("Error ouccred while deleting credential", {
        id: name,
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="bg-destructive  p-1 rounded-lg hover:bg-destructive/50">
        <XIcon size={20}/>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure you want to delete <span className="underline text-destructive hover:text-primary">{name}</span> ?</AlertDialogTitle>
        <AlertDialogDescription>
          If you delete this credential, you will not be able to recover it.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteMutation.isPending}
            onClick={(e) => {
              e.stopPropagation();
              toast.loading("Deleting credential...", { id: name });
              deleteMutation.mutate(name);
            }}
            className="bg-destructive hover:bg-destructive/50 font-semibold"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCredentialDialog;
