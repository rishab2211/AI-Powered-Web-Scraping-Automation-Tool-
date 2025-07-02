import { ExecutionEnvironment } from "@/app/types/executor";
import { ScrollToElementTask } from "../task/ScrollToElementTask";
import { waitFor } from "@/lib/helper";

export async function ScrollToElementExecutor(environment: ExecutionEnvironment<typeof ScrollToElementTask>): Promise<boolean> {
    try {

        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("input->selector not found")
        }

        const res = await environment.getPage()!.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (!element) {
                throw new Error("Element not found")
            }
            const top = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: top })
        }, selector)
        

        return true;
    } catch (err: any) {
        environment.log.error(err.message)
        return false;

    }
}