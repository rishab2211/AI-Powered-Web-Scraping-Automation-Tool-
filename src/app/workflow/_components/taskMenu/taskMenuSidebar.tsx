"use client"
import {
  Sidebar,
  SidebarContent,
 
} from "@/components/ui/sidebar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { TaskType } from "@/app/types/tasks"
import { TaskmenuBtn } from "./TaskmenuBtn"
  

export function TaskmenuSidebar() {

  return (
    <Sidebar className=" top-[60px] ">
      <SidebarContent>
        <Accordion type="multiple">
            <AccordionItem value="extraction">
                <AccordionTrigger className="font-bold p-2" >
                    DATA EXTRACTION
                </AccordionTrigger>
                <AccordionContent className="flex flex-col px-2 gap-1">
                    <TaskmenuBtn taskType={TaskType.PAGE_TO_HTML} />
                </AccordionContent>
            </AccordionItem>

        </Accordion>
      </SidebarContent>
    </Sidebar>
  )
}


