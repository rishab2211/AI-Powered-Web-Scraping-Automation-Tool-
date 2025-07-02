import { TaskParamType, TaskType } from "@/app/types/tasks";
import { WorkflowTask } from "@/app/types/Workflows";
import {
  CodeIcon,
  EyeIcon,
  GlobeIcon,
  LucideProps,
  MousePointerClick,
  TextIcon,
} from "lucide-react";

export const WaitForElementTask = {
  type: TaskType.WAIT_FOR_ELEMENT,
  label: "Wait for element",
  icon: (props) => <EyeIcon className=" stroke-orange-400 " {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Visibility",
      hideHandle : true,
      type: TaskParamType.SELECT,
      required: true,
      options: [
        {
          label: "Visible",
          value: "visible",
        },
        {
          label: "Hidden",
          value: "hidden",
        },
      ],
    },
  ] as const,
  outputs: [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
