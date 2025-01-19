import { TaskType } from "@/app/types/tasks";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTasksDetails = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Lanuch Browser",
  icon: (props: LucideProps) => (<GlobeIcon className=" stroke-blue-400 " {...props} />),
  isEntryPoint : true,
};
const LaunchBrowserTask = () => {};

export default LaunchBrowserTask;
