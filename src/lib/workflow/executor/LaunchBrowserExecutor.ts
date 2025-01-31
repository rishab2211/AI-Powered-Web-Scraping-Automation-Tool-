import { Environment, ExecutionEnvironment } from "@/app/types/executor";
import { waitFor } from "@/lib/helper";
import puppeteer from "puppeteer"
import { LaunchBrowserTask } from "../task/LaunchBrowserTask";
import { log } from "console";

export async function LaunchBrowserExecutor(environment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> {
    try {

        const websiteUrl = environment.getInput("Website URL");
        console.log("Website URL :", websiteUrl);

        const browser = await puppeteer.launch({
            headless: true, // for testing, means puppeteer will lauch a visible browser window
            // chromium browser by default is not working correctly thats why we run it in google-chrome
            executablePath: '/usr/bin/google-chrome',
        });
        environment.setBrowser(browser);

        environment.log.info("Browser started succesfully!");
        const page = await browser.newPage();

        console.log("THIS IS BROWSER PAGE INSTANCE: ", page);



        const navResponse = await page.goto(websiteUrl);
        
        console.log("THIS IS NAVIGATION RESPONSE");
        console.log(navResponse);



        environment.setPage(page);
        environment.log.info(`Opened page at ${websiteUrl}`)

        await waitFor(2000);
        // await browser.close();

        return true;
    } catch (err: any) {
        environment.log.error(err.message)
        return false;

    }
}