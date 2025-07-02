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
          defaultValue={["extraction", "interactions", "timing", "results","storage"]}
        >
          <AccordionItem value="interactions">
            <AccordionTrigger className="font-bold p-2">
              USER INTERACTIONS
            </AccordionTrigger>
            <AccordionContent className="flex flex-col px-2 gap-1">
              <TaskmenuBtn taskType={TaskType.FILL_INPUT} />
              <TaskmenuBtn taskType={TaskType.CLICK_ELEMENT} />
              <TaskmenuBtn taskType={TaskType.NAVIGATE_TO_URL} />
              <TaskmenuBtn taskType={TaskType.SCROLL_TO_ELEMENT} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="extraction">
            <AccordionTrigger className="font-bold p-2">
              DATA EXTRACTION
            </AccordionTrigger>
            <AccordionContent className="flex flex-col px-2 gap-1">
              <TaskmenuBtn taskType={TaskType.PAGE_TO_HTML} />
              <TaskmenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
              <TaskmenuBtn taskType={TaskType.EXTRACT_DATA_WITH_AI} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="storage">
            <AccordionTrigger className="font-bold p-2">
              DATA STORAGE
            </AccordionTrigger>
            <AccordionContent className="flex flex-col px-2 gap-1">
              <TaskmenuBtn taskType={TaskType.READ_PROPERTY_FROM_JSON} />
              <TaskmenuBtn taskType={TaskType.ADD_PROPERTY_TO_JSON} />
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

          <AccordionItem value="results">
            <AccordionTrigger className="font-bold p-2">
              RESULT DELIVERY
            </AccordionTrigger>
            <AccordionContent className="flex flex-col px-2 gap-1">
              <TaskmenuBtn taskType={TaskType.DELIVER_VIA_WEBHOOK} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SidebarContent>
    </Sidebar>
  );
}
