import Topbar from "@/app/workflow/_components/topbar/Topbar";
import React, { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RunExecutionSidebar } from "./_components/RunExecutionSidebar";
import { GetWorkflowExecutionWithPhases } from "@/actions/getWorkflowExecutionWithPhases";

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    executionId: string;
    workflowId: string;
  };
}) => {
  const { workflowId } = await params;
  const { executionId } = await params;

  return (
    <div className="  w-full flex flex-col">
      <section>
        <main>{children}</main>
      </section>
    </div>
  );
};

export default layout;
