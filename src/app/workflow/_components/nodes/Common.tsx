import { TaskParamType } from "@/app/types/tasks";

export const ColorForHandle : Record<TaskParamType, string>= {
    [TaskParamType.BROWSER_INSTANCE] : "!bg-sky-400",
    [TaskParamType.STRING] : "!bg-amber-400",
    [TaskParamType.SELECT] : "!bg-yellow-400",
    [TaskParamType.CREDENTIAL] : "!bg-purple-400"
}