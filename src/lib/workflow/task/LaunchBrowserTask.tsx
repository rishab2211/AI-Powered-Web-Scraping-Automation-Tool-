import { TaskParamType, TaskType } from "@/app/types/tasks";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Lanuch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className=" stroke-blue-400 " {...props} />
  ),
  isEntryPoint: true,
  inputs : [{
    name: "Website URL",
    type : TaskParamType.STRING,
    helperText : "eg: https://google.com",
    required : true,
    hideHandle : true
  }],
  outputs : [
    {
      name : "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      
    }
  ]
};
