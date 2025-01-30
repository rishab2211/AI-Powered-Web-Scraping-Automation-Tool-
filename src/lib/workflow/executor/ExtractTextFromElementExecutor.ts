import { ExecutionEnvironment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowserTask";
import { PageToHtmlTask } from "../task/PageToHtml";
import { ExtractTextFromElement } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecutor(environment: ExecutionEnvironment<typeof ExtractTextFromElement>): Promise<boolean> {
    try {

        const Selector = environment.getInput("Selector");
        if (!Selector) {
            console.log("Selector is not defined");
            return false;
        }

        const html = environment.getInput("HTML");
        if (!html) {
            console.log("Html is not defined");
            return false;
        }

        const $ = cheerio.load(html);
        const element = $(Selector);
        if(!element){
            console.error("Element not found");
            return false;
        }

        const extractedText = $.text(element);
        if(!extractedText){
            console.log("Either the element has not text or cannot read text.")
            return false;
        }

        environment.setOutput("Extracted text",extractedText);


        return true;
    } catch (err) {
        console.log(err);
        return false;

    }
}