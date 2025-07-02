import { TaskParamType, TaskType } from "@/app/types/tasks";
import { WorkflowTask } from "@/app/types/Workflows";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Lanuch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className=" stroke-blue-400 " {...props} />
  ),
  isEntryPoint: true,
  credits : 5,
  inputs : [{
    name: "Website URL",
    type : TaskParamType.STRING,
    helperText : "eg: https://google.com",
    required : true,
    hideHandle : true
  }] as const,
  outputs : [
    {
      name : "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      
    }
  ] as const,
} satisfies WorkflowTask;