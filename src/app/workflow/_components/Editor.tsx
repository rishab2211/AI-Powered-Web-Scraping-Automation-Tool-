import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import Topbar from "./topbar/Topbar";
import { TaskmenuSidebar } from "./taskMenu/taskMenuSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Editor = ({ workflow }: { workflow: Workflow }) => {
  return (
    <div className="h-[95vh]">
      <ReactFlowProvider>
        <div className=" flex flex-col h-full w-full overflow-hidden ">
          <Topbar title="Workflow Editor" subtitle={workflow.name} workflowId={workflow.id}/>
          <section>
          <SidebarProvider>
            <TaskmenuSidebar />
            <SidebarTrigger className="ml-1 relative"/>
            <main>
            <FlowEditor workflow={workflow} />
            </main>
            </SidebarProvider>
          </section>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Editor;
