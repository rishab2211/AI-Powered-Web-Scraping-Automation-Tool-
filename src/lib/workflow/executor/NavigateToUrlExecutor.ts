import { ExecutionEnvironment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowserTask";
import { PageToHtmlTask } from "../task/PageToHtml";
import { FillInputTask } from "../task/FillInout";
import { ClickElementTask } from "../task/ClickElement";
import { AddPropertyToJsonTask } from "../task/AddPropertyToJsonTask";
import { NavigateToUrlTask } from "../task/NavigateToUrlTask";

export async function NavigateToUrlExecutor(environment: ExecutionEnvironment<typeof NavigateToUrlTask>): Promise<boolean> {
    try {

        
        const url = environment.getInput("URL");
        if (!url) {
            environment.log.error("input->url name not found")
        }

        await environment.getPage()!.goto(url);

        environment.log.info(`Visited URL: ${url}`);

        

        return true;
    } catch (err: any) {
        environment.log.error(err.message)
        return false;

    }
}