"use client";

import React, { useCallback, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyIcon, Loader2, SquarePen } from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  duplicateWorkflowSchema,
  duplicateWorkflowSchemaType,
} from "@/schema/workflow";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DuplicateWorkflow } from "@/actions/workflows/duplicateWorkflow";

interface DuplicateWorkflowDialogProps {
  workflowId: string;
  workflowName?: string;
  workflowDescription?: string;
  trigger?: React.ReactNode;
}

const DuplicateWorkflowDialog = ({ 
  workflowId, 
  workflowName = "",
  workflowDescription = "",
  trigger 
}: DuplicateWorkflowDialogProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<duplicateWorkflowSchemaType>({
    resolver: zodResolver(duplicateWorkflowSchema),
    defaultValues: {
      workflowId,
      name: "",
      description: ""
    },
  });

  // Set default values when dialog opens
  useEffect(() => {
    if (open && workflowName) {
      form.setValue("name", `${workflowName} (Copy)`);
      form.setValue("description", workflowDescription);
    }
  }, [open, workflowName, workflowDescription, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: DuplicateWorkflow,
    onSuccess: (data:any) => {
      const newWorkflowId = typeof data === 'string' ? data : data?.id;
      
      if (newWorkflowId) {
        toast.success("Workflow duplicated successfully", { 
          id: "duplicate-workflow",
          duration: 3000 
        });
        
        // Reset form and close dialog
        form.reset();
        setOpen(false);
        
        // Navigate to the new workflow
        router.push(`/workflow/editor/${newWorkflowId}`);
      } else {
        toast.error("Workflow duplicated but navigation failed", { 
          id: "duplicate-workflow" 
        });
      }
    },
    onError: (error) => {
      console.error("Failed to duplicate workflow:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to duplicate workflow";
        
      toast.error(errorMessage, { 
        id: "duplicate-workflow",
        duration: 5000 
      });
    },
  });

  const onSubmit = useCallback(
    async (values: duplicateWorkflowSchemaType) => {
      // Validate that name is provided
      if (!values.name.trim()) {
        form.setError("name", {
          type: "required",
          message: "Workflow name is required"
        });
        return;
      }

      toast.loading("Duplicating workflow...", { id: "duplicate-workflow" });
      
      try {
        await mutate(values);
      } catch (error) {
        // Error is handled in the mutation's onError callback
        console.error("Mutation error:", error);
      }
    },
    [mutate, form]
  );

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      form.reset({
        workflowId,
        name: "",
        description: ""
      });
      // Clear any pending toasts
      toast.dismiss("duplicate-workflow");
    }
    setOpen(newOpen);
  }, [form, workflowId]);

  const handleCancel = useCallback(() => {
    form.reset();
    setOpen(false);
    toast.dismiss("duplicate-workflow");
  }, [form]);

  // Default trigger if none provided
  const defaultTrigger = (
    <Button 
      variant="ghost" 
      size="icon"
      className="h-6 w-6 hover:bg-gray-100"
      aria-label="Duplicate workflow"
    >
      <CopyIcon className="w-3 h-3" />
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      
      <DialogContent className="px-0 max-w-md">
        <CustomDialogHeader
          title="Duplicate Workflow"
          subTitle="Create a copy of this workflow"
          icon={SquarePen}
        />

        <div className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* Workflow Name Field */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Workflow Name
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter workflow name"
                        disabled={isPending}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name for the duplicate.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Workflow Description Field */}
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter a brief description"
                        className="resize-none"
                        rows={3}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Add a description to help identify this workflow.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={isPending}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isPending || !form.watch("name")?.trim()}
                  className="flex-1"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Duplicating...
                    </>
                  ) : (
                    <>
                      <CopyIcon className="w-4 h-4 mr-2" />
                      Duplicate
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateWorkflowDialog;