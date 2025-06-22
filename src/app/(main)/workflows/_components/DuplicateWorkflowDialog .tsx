"use client";
import React, { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyIcon, Loader2, SquarePen } from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
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
import { createWorkflow } from "@/actions/workflows/createWorkflow";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { waitFor } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { DuplicateWorkflow } from "@/actions/workflows/duplicateWorkflow";


const DuplicateWorkflowDialog   = ({ workflowId }: { workflowId: string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<duplicateWorkflowSchemaType>({
    resolver: zodResolver(duplicateWorkflowSchema),
    defaultValues: {
      workflowId,
      name : "",
      description : ""
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: DuplicateWorkflow,
    onSuccess: (workflowId) => {
      toast.success("Workflow duplicated", { id: "duplicate-workflow" });
      form.reset();
      setOpen(false);
      // Navigate programmatically after success
      router.push(`/workflow/editor/${workflowId}`);
    },
    onError: (error) => {
      console.log(error);
      
      toast.error("Failed to duplicate a workflow", { id: "duplicate-workflow" });
    },
  });

  const onSubmit = useCallback(
    (values: duplicateWorkflowSchemaType) => {
      toast.loading("Creating workflow...", { id: "duplicate-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={(open)=>{
      form.reset();
      setOpen(open);
    }}>
      <DialogTrigger asChild>
        <Button className="transition-opacity duration-300 opacity-0 group-hover/card:opacity-100" variant={"ghost"} size={"icon"} >
          <CopyIcon/>
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Duplicate workflow"
          icon={SquarePen}
        />

        <div className="p-6 h-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
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
                    <FormMessage/>
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
                {!isPending && "Proceed" }
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateWorkflowDialog ;
