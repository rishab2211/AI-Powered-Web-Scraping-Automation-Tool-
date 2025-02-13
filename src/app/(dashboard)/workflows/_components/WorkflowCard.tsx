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
import {
  CalendarSync,
  CoinsIcon,
  FileTextIcon,
  Pencil,
  PlayIcon,
} from "lucide-react";
import { WorkflowStatus } from "@/app/types/Workflows";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import WorkflowActions from "./WorkflowActions";
import { useEffect, useState } from "react";
import RunBtn from "./RunBtn";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SchedulerDialog from "./SchedulerDialog";
import cronstrue from "cronstrue"
import { read } from "fs";
const statusIconColors = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-700",
  [WorkflowStatus.PUBLISHED]: "bg-red-400 text-red-700",
};

const WorkflowCard = ({ workflow }: { workflow: Workflow }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  const [isCron, setIsCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");

  useEffect(() => {
    if (workflow.cron) {
      setIsCron(true);
      const str = cronstrue.toString(workflow.cron);
      setReadableCron(str);
    }else{
      setIsCron(false);
      setReadableCron("");
    }
  }, [workflow, workflow.cron]);

  return (
    <Card className=" border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md  dark:shadow-primary/30  ">
      <CardContent className="p-4 w-full flex gap-2 items-center justify-between h-[100px]">
        <div className="flex  gap-1">
          <div
            className={cn(
              "p-1.5 rounded-full flex justify-center items-center",
              statusIconColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="w-5 h-5 text-black/60" />
            ) : (
              <PlayIcon className="w-5 h-5 text-white" />
            )}
          </div>
          <div className=" flex flex-col w-full items-center justify-between">
            <h3 className=" flex w-full text-base font-bold text-muted-foreground ">
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className=" flex items-center break-words whitespace-normal truncate hover:underline "
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="ml-2 flex justify-center px-1 py-0.5 items-center  text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full  ">
                  DRAFT
                </span>
              )}
            </h3>
          </div>
        </div>
        {!isDraft && (
          <ScheduleSection
            isCron={isCron}
            workflowId={workflow.id}
            creditsRequired={workflow.creditCost}
            readableCron={readableCron}
            
          />
        )}
        {!isDraft && <RunBtn workflowId={workflow.id} />}
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

function ScheduleSection({
  creditsRequired,
  workflowId,
  isCron,
  readableCron
}: {
  creditsRequired: number;
  workflowId: string;
  isCron: boolean;
  readableCron : string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <SchedulerDialog
              workflowId={workflowId}
              creditsRequired={creditsRequired}
              isCron={isCron}
            />
          </div>
        </TooltipTrigger>
        {isCron ? (
          <TooltipContent>
            Schedule to run {readableCron}
            
          </TooltipContent>
        ) : (
          <TooltipContent>
            Schedule this workflow as cron job for {creditsRequired} credits.
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
