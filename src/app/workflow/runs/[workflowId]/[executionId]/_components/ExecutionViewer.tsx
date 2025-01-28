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

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

const ExecutionViewer = ({ initialData }: { initialData: ExecutionData }) => {
  // const query = useQuery({
  //   queryKey: ["execution", initialData?.id],
  //   initialData,
  //   queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
  //   refetchInterval: (q) =>
  //     q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  // });

  // const duration = DatesToDurationString(
  //   query?.data?.completedAt,
  //   query?.data?.startedAt
  // );

  
  // console.log("in the execution viewer");
  
  // console.dir(initialData,{depth : null});
  

  return (
    <div className="h-full w-full flex ">
      {/* <SidebarProvider>
        <RunExecutionSidebar initialData={initialData} />
        <SidebarTrigger className="relative" />
      </SidebarProvider> */}
      <main>
        <div>hello</div>
      </main>
    </div>
  );
};

export default ExecutionViewer;

export function ExecutionLabel({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  const Icon = icon;

  return (
    <SidebarMenuButton className="flex justify-between p-2 my-0.5">
      <div className="flex items-center gap-1">
        <Icon size={15} />
        <span>{label}</span>
      </div>
      <div>{value}</div>
    </SidebarMenuButton>
  );
}
