import { TaskType } from "@/app/types/tasks"
import {LaunchBrowserExecutor} from "./LaunchBrowserExecutor"
import { PageToHtmlExecutor } from "./PageToHtmlExecutor"
import { ExecutionEnvironment } from "@/app/types/executor";
import { WorkflowTask } from "@/app/types/Workflows";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";

type ExecutorFn<T extends WorkflowTask> = (environment : ExecutionEnvironment<T>)=> Promise<boolean>;

type RegistryType = {
    [K in TaskType] : ExecutorFn<WorkflowTask & {type : K}>;
}

export const ExecutorRegistry : RegistryType = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,

}