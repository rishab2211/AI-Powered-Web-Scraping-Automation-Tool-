import { LaunchBrowserTask } from "./LaunchBrowserTask";
import { PageToHtmlTask } from "./PageToHtml";
import { ExtractTextFromElement } from "./ExtractTextFromElement";
import { TaskType } from "@/app/types/tasks";
import { WorkflowTask } from "@/app/types/Workflows";
import { FillInputTask } from "./FillInout";
import { ClickElementTask } from "./ClickElement";
import { WaitForElementTask } from "./WaitForElementTask";
import { DeliverViaWebhook } from "./DeliverViaWebhook";
import { ExtractDataWithAiTask } from "./ExtractDataWithAI";
import { ReadPropertyFromJsonTask } from "./ReadPropertyFromJson";

type Registry = {
  [k in TaskType]: WorkflowTask;
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT : ClickElementTask,
  WAIT_FOR_ELEMENT : WaitForElementTask,
  DELIVER_VIA_WEBHOOK : DeliverViaWebhook,
  EXTRACT_DATA_WITH_AI : ExtractDataWithAiTask,
  READ_PROPERTY_FROM_JSON : ReadPropertyFromJsonTask
};
