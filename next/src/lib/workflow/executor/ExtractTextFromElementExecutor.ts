import { ExecutionEnvironment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowserTask";
import { PageToHtmlTask } from "../task/PageToHtml";
import { ExtractTextFromElement } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecutor(environment: ExecutionEnvironment<typeof ExtractTextFromElement>): Promise<boolean> {
    try {

        const Selector = environment.getInput("Selector");
        if (!Selector) {
            environment.log.error("selector is not provided.")
            return false;
        }
        environment.log.info("Required Selector found")

        const html = environment.getInput("HTML");
        if (!html) {
            environment.log.error("HTML not defined.")
            return false;
        }
        environment.log.info("Successfully fetched the HTML")

        const $ = cheerio.load(html);
        const element = $(Selector);
        if(!element){
            environment.log.error("element not defined.")
            return false;
        }

        const extractedText = $.text(element);
        if(!extractedText){
            environment.log.error("Either the element have no text or cannot read text.")
            return false;
        }

        environment.setOutput("Extracted text",extractedText);
        environment.log.info("Successfully extracted Text from element.")

        return true;
    } catch (err : any) {
        environment.log.error(err.message);
        return false;

    }
}