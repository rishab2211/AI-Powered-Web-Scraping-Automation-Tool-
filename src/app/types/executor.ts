import { Browser } from "puppeteer";

export type Environment = {

    // Phases with PhaseIds as key

    browser?: Browser,
    phases: {

        [key: string]: {
            inputs: Record<string, string>;
            outputs: Record<string, string>;
        }
    }
}