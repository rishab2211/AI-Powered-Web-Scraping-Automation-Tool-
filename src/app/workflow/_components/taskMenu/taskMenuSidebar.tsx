"use client";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TaskType } from "@/app/types/tasks";
import { TaskmenuBtn } from "./TaskmenuBtn";

export function TaskmenuSidebar() {
  return (
    <Sidebar className=" top-[60px] ">
      <SidebarContent>
        <Accordion
          type="multiple"
          defaultValue={["extraction", "interactions", "timing"]}
        >
          <AccordionItem value="interactions">
            <AccordionTrigger className="font-bold p-2">
              USER INTERACTIONS
            </AccordionTrigger>
            <AccordionContent className="flex flex-col px-2 gap-1">
              <TaskmenuBtn taskType={TaskType.FILL_INPUT} />
              <TaskmenuBtn taskType={TaskType.CLICK_ELEMENT} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="extraction">
            <AccordionTrigger className="font-bold p-2">
              DATA EXTRACTION
            </AccordionTrigger>
            <AccordionContent className="flex flex-col px-2 gap-1">
              <TaskmenuBtn taskType={TaskType.PAGE_TO_HTML} />
              <TaskmenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="timing">
            <AccordionTrigger className="font-bold p-2">
              TIMING CONTROLS
            </AccordionTrigger>
            <AccordionContent className="flex flex-col px-2 gap-1">
              <TaskmenuBtn taskType={TaskType.WAIT_FOR_ELEMENT} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SidebarContent>
    </Sidebar>
  );
}
