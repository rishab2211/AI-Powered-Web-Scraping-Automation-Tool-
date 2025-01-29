"use client";

import { GetWorkflowExecutionWithPhases } from "@/actions/getWorkflowExecutionWithPhases";
import { WorkflowExecutionStatus } from "@/app/types/Workflows";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import {
  CircleCheck,
  CircleDashedIcon,
  CircleEllipsis,
  CirclePlay,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  Menu,
  SquarePen,
  TimerIcon,
  WorkflowIcon,
} from "lucide-react";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DatesToDurationString } from "@/lib/helper";
import { RunExecutionSidebar } from "./RunExecutionSidebar";
import { useSearchParams } from "next/navigation";
import { GetWorkflowPhaseDetails } from "@/actions/getPhaseDetails";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

const ExecutionViewer = ({ initialData }: { initialData: ExecutionData }) => {
  // const query = useQuery({
  //   queryKey: ["execution", initialData?.id],
  //   initialData,
  //   queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
  //   refetchInterval: (q) =>
  //     q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  // });

  

  const searchParams = useSearchParams();
  const selectedPhase = searchParams.get("phase");
  // const selectedPhase = initialData?.phases.find(
  //   (phase) => phase.id === selectedPhaseId
  // );

  const phaseDetails= useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    enabled : selectedPhase !== null,
    queryFn: () => {
      if (!selectedPhase) {
        throw new Error("No phase selected");
      }
      return GetWorkflowPhaseDetails(selectedPhase);
    }
  })

  return (
    <div className="h-full w-full flex  ml-2 mt-7 ">
      <pre>{JSON.stringify(phaseDetails.data, null, 4)}</pre>
    </div>
  );
};

export default ExecutionViewer;
