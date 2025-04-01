import { ExecutionEnvironment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowserTask";
import { PageToHtmlTask } from "../task/PageToHtml";
import { FillInputTask } from "../task/FillInout";
import { ClickElementTask } from "../task/ClickElement";
import { AddPropertyToJsonTask } from "../task/AddPropertyToJsonTask";

export async function AddPropertyToJsonExecutor(environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>): Promise<boolean> {
    try {

        const json = environment.getInput("JSON");
        if (!json) {
            environment.log.error("input->json not found")
        }

        const propertyName = environment.getInput("Property name");
        if (!propertyName) {
            environment.log.error("input->property name not found")
        }

        const propertyValue = environment.getInput("Property value");
        if (!propertyValue) {
            environment.log.error("input->property value not found")
        }

        const jsonData = JSON.parse(json);
        jsonData[propertyName] = propertyValue;

        environment.setOutput("Update JSON", JSON.stringify(jsonData));
        return true;




        return true;
    } catch (err: any) {
        environment.log.error(err.message)
        return false;

    }
}