import { ExecutionEnvironment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowserTask";
import { PageToHtmlTask } from "../task/PageToHtml";
import { FillInputTask } from "../task/FillInout";

export async function FillInputExecutor(environment: ExecutionEnvironment<typeof FillInputTask>): Promise<boolean> {
    try {

        const selector = environment.getInput("Selector");
        if(!selector){
            environment.log.error("input->selector not found")
        }

        const value = environment.getInput("Value");
        if(!value){
            environment.log.error("input->value not found")
        }

        await environment.getPage()!.type(selector, value)
        
        return true;
    } catch (err : any) {
        environment.log.error(err.message)
        return false;

    }
}