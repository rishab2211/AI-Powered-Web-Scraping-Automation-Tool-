import { ExecutionEnvironment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowserTask";
import { PageToHtmlTask } from "../task/PageToHtml";
import { FillInputTask } from "../task/FillInout";
import { ClickElementTask } from "../task/ClickElement";
import { WaitForElementTask } from "../task/WaitForElementTask";

export async function WaitForElementExecutor(environment: ExecutionEnvironment<typeof WaitForElementTask>): Promise<boolean> {
    try {

        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("input->selector not found")
        }

        const visibility = environment.getInput("Visibility");
        if (!visibility) {
            environment.log.error("input->visibility not defined")
        }

        await environment.getPage()!.waitForSelector(selector, {
            visible: visibility === "visibility",
            hidden: visibility === "hidden"
        });

        environment.log.info(`Element ${selector} became ${visibility}`)

        return true;
    } catch (err: any) {
        environment.log.error(err.message)
        return false;

    }
}