import { TaskParamType, TaskType } from "@/app/types/tasks";
import { WorkflowTask } from "@/app/types/Workflows";
import { CodeIcon, GlobeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from page",
  icon: (props: LucideProps) => (
    <CodeIcon className=" stroke-blue-400 " {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs : [{
    name: "Web page",
    type : TaskParamType.BROWSER_INSTANCE,
    required : true,
  }],
  outputs : [
    {
        name :"HTML",
        type : TaskParamType.STRING
    },
    {
        name : "Web page",
        type : TaskParamType.BROWSER_INSTANCE
    }
  ]
} satisfies WorkflowTask;