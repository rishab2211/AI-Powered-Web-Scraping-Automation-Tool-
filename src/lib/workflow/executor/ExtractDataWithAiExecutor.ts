import { ExecutionEnvironment } from "@/app/types/executor";
import { ExtractDataWithAiTask } from "../task/ExtractDataWithAI";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function ExtractDataWithAiExecutor(environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>): Promise<boolean> {
    try {

        const credentials = environment.getInput("Credentials");
        if (!credentials) {
            environment.log.error("input->credentials not found");
        }

        const prompt = environment.getInput("Prompt");
        if (!prompt) {
            environment.log.error("input->credentials not found")
        }

        const content = environment.getInput("Content");
        if (!content) {
            environment.log.error("input->content not found")
        }

        // Get credentials from DB
        const credential = await prisma.credential.findUnique({
            where: { id: credentials }
        })

        if (!credential) {
            environment.log.error("credential not found")
        }

        const plainCredentialValue = symmetricDecrypt(credential?.value!)
        if (!plainCredentialValue) {
            environment.log.error("cannot decrypt credential");
            return false;
        }

        // --- AI Client Initialization & Model Interaction ---

        // Correct constructor usage: Pass API key directly
        const ai = new GoogleGenerativeAI(plainCredentialValue);

        // Define the system instruction clearly
        const systemInstruction = `You are a webscraper helper that extracts data from HTML or text.
You will be given a specific prompt detailing what to extract and the content (text or HTML) to extract from.
Your response MUST be ONLY the extracted data formatted as a valid JSON array or object.
Do NOT include any introductory phrases, explanations, apologies, or markdown formatting like \`\`\`json.
Analyze the input content carefully and extract data precisely based on the user's prompt.
If no data matching the prompt is found in the content, return an empty JSON array [].
Work strictly with the provided content. Ensure the output is always a valid JSON structure (array or object) and nothing else.`;

        // generative model instance
        const model = ai.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemInstruction
        });

        // Combine the user's extraction prompt and the content into the user message
        const combinedUserInput = `Prompt: ${prompt}\n\nContent:\n${content}`;

        //generate content
        const contents = [
            {
                role: "user",
                parts: [{ text: combinedUserInput }]
            }
        ];

        environment.log.info(`Sending request to Gemini model '${model.model}'...`);

        // Call generateContent on the model instance
        const result = await model.generateContent({ contents });

        // Correctly access the response text
        const response = result.response;

        const aiResponseText = response.text();

        environment.log.info("Received response from AI.");
        environment.log.info(`Tokens sent : ${response.usageMetadata?.promptTokenCount}`);
        environment.log.info(`Response tokens : ${response.usageMetadata?.candidatesTokenCount}`);


        // Output the raw text response from the AI (which should be JSON)

        environment.setOutput("Extracted data", aiResponseText);
        environment.log.info("Successfully set 'Extracted data' output.");


        return true;
    } catch (err: any) {
        environment.log.error(err.message)
        return false;

    }
}
