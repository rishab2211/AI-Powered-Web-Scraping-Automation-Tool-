import { ExecutionEnvironment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowserTask";
import { PageToHtmlTask } from "../task/PageToHtml";
import { FillInputTask } from "../task/FillInout";
import { ClickElementTask } from "../task/ClickElement";

export async function ClickElementExecutor(environment: ExecutionEnvironment<typeof ClickElementTask>): Promise<boolean> {
    try {

        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("input->selector not found")
        }

        await environment.getPage()!.click(selector);

        return true;
    } catch (err: any) {
        environment.log.error(err.message)
        return false;

    }
}