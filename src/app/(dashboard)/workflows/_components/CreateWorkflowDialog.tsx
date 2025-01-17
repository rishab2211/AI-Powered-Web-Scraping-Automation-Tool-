"use client";
import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createWorkflow } from "@/actions/CreateWorkflow";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      toast.success("Workflow created", { id: "create-workflow" });
      form.reset(); // Reset form fields on success
      setOpen(false); // Close dialog on success
    },
    onError: () => {
      toast.error("Failed to create a workflow", { id: "create-workflow" });
    },
  });

  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <SquarePen />
          {triggerText ?? "Create Workflow"}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Create workflow"
          icon={SquarePen}
          subTitle="Start building your workflows"
        />

        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
              {/* Workflow Name Field */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter workflow name" />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name.
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Workflow Description Field */}
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter a brief description"
                        className="resize-none"
                      />
                    </FormControl>
                    <FormDescription>
                      Write a brief description for your workflow.
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creating..." : "Proceed"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
