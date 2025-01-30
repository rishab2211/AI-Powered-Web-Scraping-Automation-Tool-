import { Environment } from "@/app/types/executor";
import { waitFor } from "@/lib/helper";
import puppeteer from "puppeteer"

export async function LaunchBrowserExecutor(environment : Environment) : Promise<boolean> {
    try{
        console.log("IN ENVIRONMENT :");
        console.dir(environment, {depth : null});

    const broswser = await puppeteer.launch({
        headless : false, // for testing, means puppeteer will lauch a visible browser window

        // chromium browser by default is not working correctly thats why we run it in google-chrome
        executablePath: '/usr/bin/google-chrome',

        
    });

    await waitFor(2000);
    await broswser.close();
    
    return true;
    }catch(err){
        console.log(err);
        return false;
        
    }
}