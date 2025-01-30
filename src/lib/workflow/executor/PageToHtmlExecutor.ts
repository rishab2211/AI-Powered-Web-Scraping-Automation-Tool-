import { ExecutionEnvironment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowserTask";
import { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecutor(environment: ExecutionEnvironment<typeof PageToHtmlTask>): Promise<boolean> {
    try {

        const html = await environment.getPage()!.content();
        console.log("PAGE HTML", html);
        
        return true;
    } catch (err) {
        console.log(err);
        return false;

    }
}