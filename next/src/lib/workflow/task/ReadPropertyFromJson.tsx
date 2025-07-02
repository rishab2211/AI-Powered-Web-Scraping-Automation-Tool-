import { TaskParamType, TaskType } from "@/app/types/tasks";
import { WorkflowTask } from "@/app/types/Workflows";
import { CodeIcon, FileJson2Icon, GlobeIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const ReadPropertyFromJsonTask = {
  type: TaskType.READ_PROPERTY_FROM_JSON,
  label: "Read Property from JSON",
  icon: (props) => (
    <FileJson2Icon className=" stroke-orange-400 " {...props} />
  ),
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "JSON",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Property name",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Property value",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
