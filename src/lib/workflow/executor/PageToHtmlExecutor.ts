import { ExecutionEnvironment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowserTask";
import { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecutor(environment: ExecutionEnvironment<typeof PageToHtmlTask>): Promise<boolean> {
    try {

        const html = await environment.getPage()!.content();
        console.log("----------THIS IS PAGE HTML-------" );
        console.dir(html, {depth : null})

        environment.setOutput("HTML",html);
        
        return true;
    } catch (err : any) {
        environment.log.error(err.message)
        return false;

    }
}