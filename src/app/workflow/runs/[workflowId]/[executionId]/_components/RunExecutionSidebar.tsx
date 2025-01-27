"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  CircleCheck,
  CircleDashedIcon,
  CircleEllipsis,
  CirclePlay,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  SquarePen,
  TimerIcon,
  WorkflowIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { WorkflowExecutionStatus } from "@/app/types/Workflows";
import { GetWorkflowExecutionWithPhases } from "@/actions/getWorkflowExecutionWithPhases";
import { ExecutionLabel } from "./ExecutionViewer";
import { formatDistanceToNow } from "date-fns";
import { DatesToDurationString } from "@/lib/helper";
import { Badge } from "@/components/ui/badge";


type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;


export function RunExecutionSidebar({ initialData }: { initialData: ExecutionData }) {


    const query = useQuery({
        queryKey: ["execution", initialData?.id],
        initialData,
        queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
        refetchInterval: (q) =>
          q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
      });

      const duration = DatesToDurationString(query?.data?.completedAt, query?.data?.startedAt )

  return (
    <Sidebar className=" top-[60px] p-1 ">
      
    <SidebarContent>
    
      
      <SidebarMenuItem className="list-none">
        <ExecutionLabel
          label={"STATUS"}
          value={query?.data?.status}
          icon={CircleDashedIcon}
        />
        <ExecutionLabel
          label={"STARTED AT"}
          value={
            query?.data?.startedAt
              ? formatDistanceToNow(new Date(query.data?.startedAt), {
                  addSuffix: true,
                })
              : "-"
          }
          icon={CirclePlay}
        />
        <ExecutionLabel
          label={"CREATED AT"}
          value={
            query?.data?.startedAt
              ? formatDistanceToNow(new Date(query.data?.startedAt), {
                  addSuffix: true,
                })
              : "-"
          }
          icon={SquarePen}
        />
        <ExecutionLabel
          label={"COMPLETED AT"}
          value={
            query?.data?.completedAt
              ? formatDistanceToNow(new Date(query.data?.createdAt), {
                  addSuffix: true,
                })
              : "---"
          }
          icon={CircleCheck}
        />
        <ExecutionLabel
          label={"DURATION"}
          value={duration? duration : <Loader2Icon className="animate-spin" size={18}  />}
          icon={TimerIcon}
        />
        <ExecutionLabel
          label={"CREDITS CONSUMED"}
          value={"TODO"}
          icon={CoinsIcon}
        />

        <div className="flex justify-center items-center gap-1 border-t border-b ">
          <WorkflowIcon size={16} />
          PHASE
        </div>

        {query?.data?.phases.map((phase, index) => (
          <SidebarMenuButton key={phase.id} className="my-1">
            <Badge variant={"outline"}>{index+1}</Badge>
            {phase.name}</SidebarMenuButton>
        ))}
      </SidebarMenuItem>
    </SidebarContent>
  </Sidebar>
  
  );
}
