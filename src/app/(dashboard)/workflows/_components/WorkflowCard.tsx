"use client";

import { Workflow } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileTextIcon, Pencil, PlayIcon } from "lucide-react";
import { WorkflowStatus } from "@/app/types/Workflows";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import WorkflowActions from "./WorkflowActions";
import { useState } from "react";

const statusIconColors = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-700",
  [WorkflowStatus.PUBLISHED]: "bg-red-400 text-red-700",
};

const WorkflowCard = ({ workflow }: { workflow: Workflow }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card className=" border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md  dark:shadow-primary/30  ">
      <CardContent className="p-4 w-full flex gap-2 items-center justify-between h-[100px]">
        <div className="flex gap-1">
          <div
            className={cn(
              "p-1.5 rounded-full flex justify-center items-center",
              statusIconColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </div>
          <div className=" flex w-full items-center justify-between">
            <h3 className=" flex w-full text-base font-bold text-muted-foreground ">
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className=" flex items-center hover:underline "
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className=" ml-2 flex justify-center px-1 py-0.5 items-center  text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full  ">
                  DRAFT
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="flex gap-1">
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center p-2"
            )}
          >
            <Pencil /> edit
          </Link>
          <WorkflowActions workflowId={workflow.id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;
