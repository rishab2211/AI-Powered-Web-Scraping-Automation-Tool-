import { ExecutionEnvironment } from "@/app/types/executor";
import { ReadPropertyFromJsonTask } from "../task/ReadPropertyFromJson";

export async function ReadPropertyFromJsonExecutor(environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>): Promise<boolean> {
    try {
        const jsonData = environment.getInput("JSON");
        if (!jsonData) {
            environment.log.error("input->JSON data is not defined")
        }

        const propertyName = environment.getInput("Property name");
        if (!propertyName) {
            environment.log.error("input->property name is not defined")
        }

        const json = JSON.parse(jsonData);
        const propertyValue = json[propertyName];

        if (propertyValue === undefined) {
            environment.log.error("property is not defined")
            return false;
        }

        environment.setOutput("Property value", propertyValue);






        return true;
    } catch (err: any) {
        environment.log.error(err.message)
        return false;

    }
}