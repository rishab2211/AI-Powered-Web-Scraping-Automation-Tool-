import { TaskParamType, TaskType } from "@/app/types/tasks";
import { CodeIcon, GlobeIcon, LucideProps, TextIcon } from "lucide-react";

export const ExtractTextFromElement = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => (
    <TextIcon className=" stroke-blue-400 " {...props} />
  ),
  isEntryPoint: false,
  inputs : [{
    name: "HTML",
    type : TaskParamType.STRING,
    required : true,
    variant : "textarea"
  },
  {
    name: "Selector",
    type : TaskParamType.STRING,
    required : true,
  }
],
  outputs : [
    {
        name :"Extracted text",
        type : TaskParamType.STRING
    },
    
  ]
};
