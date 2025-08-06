import { config } from "@dotenvx/dotenvx";

import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import debug from "debug";

import { PayPalAgentToolkit, ALL_TOOLS_ENABLED } from '@paypal/agent-toolkit/ai-sdk'
import { generateId, generateText, Message, streamText } from "ai";

import { getDeepSeekModel, getVolcanoModel } from "@utils/llm/model"
import { readMarkdownAsync } from "@utils/files/readFile";
import { ProductTool } from "@utils/tool/productTool";
import { PayPalValidationTool } from "@utils/tool/paypalValidationTool";



const logger = debug('cmd-line-bot');
const envFilePath = process.env.ENV_FILE_PATH;
config({ path: envFilePath })

const ppConfig = {
    clientId: process.env.PAYPAL_CLIENT_ID || "",
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || "",
    environment: process.env.PAYPAL_ENVIRONMENT || "Sandbox",
    logRequestDetails: process.env.PAYPAL_LOG_REQUESTS || "false",
    logResponseDetails: process.env.PAYPAL_LOG_RESPONSES || "false",
    debug: process.env.PAYPAL_DEBUG_FLOWS || "false",
}



console.clear();
console.log(chalk.greenBright.bold("Welcome, let's get start!"));
console.log(chalk.gray("Type 'exit' to quit or 'clear' to reset memory.\n"))

//Conservation History
let messageHistory: Message[] = []

const chat = async () => {
    const paypalToolkit = new PayPalAgentToolkit({
        clientId: ppConfig.clientId,
        clientSecret: ppConfig.clientSecret,
        configuration: {
            actions:
            //  ALL_TOOLS_ENABLED
            {
                // invoices: {
                //     create: true,
                //     list: true,
                //     send: true,
                //     generateQRC: true
                // },
                products: {
                    create: true,
                    list: true,
                    show: true
                },
                orders: {
                    create: true,
                    get: true
                },
                shipment: { create: true, show: true, cancel: true },
            }
            , context: {
                sandbox: true
            }
        }
    })
    const productTool = new ProductTool();
    const paypalValidationTool = new PayPalValidationTool();
    const tools = {
        ...paypalToolkit.getTools(),
        ...productTool.getTools(),
        ...paypalValidationTool.getTools()
    };

    // const llm = getVolcanoModel();
    const llm = getDeepSeekModel();

    const systemPrompts = await readMarkdownAsync("@prompts/systemPrompts/living-area-shop.md")


    while (true) {
        const { userInput } = await inquirer.prompt([
            {
                type: 'input',
                name: 'userInput',
                message: chalk.yellowBright("You:")
            }
        ])

        const command = userInput.toLowerCase();
        if (command === 'exit') {
            console.log(chalk.yellow('\nGoodbye!'));
            break;
        }

        if (command === 'clear') {
            messageHistory = [];
            console.log("Chat history cleared. Starting fresh...\n");
            continue;
        }

        messageHistory.push({
            id: generateId(),
            role: 'user',
            content: userInput
        })

        // const spinner = ora("Agent is thinking...").start();

        const result = streamText({
            model: llm,
            messages: messageHistory,
            tools,

            system: systemPrompts,
            maxRetries: 1,
            maxSteps: 3,
            onStepFinish: ({ toolCalls, toolResults }) => {
                // console.log("\n[Tool Calls]:", JSON.stringify(toolCalls, null, 2))
                // console.log("[Tool Results]:", JSON.stringify(toolResults, null, 2))
            }
        });

        // console.log(JSON.stringify(result,null,' '))
        // setTimeout(() => {
        //     spinner.stop();
        // }, 300);


        let fullResponse = '';

        console.log(chalk.red("HoneyPot Bot:"))

        for await (const textPart of result.textStream) {
            fullResponse += textPart;
            process.stdout.write(chalk.blueBright(textPart));

        }
        console.log(chalk.blueBright('\n'))



        messageHistory.push({
            id: generateId(),
            role: "assistant",
            content: fullResponse
        })

        // **********************************************************

        // const spinner = ora("Agent is thinking...").start();

        // const { text } = await generateText({
        //     model: llm,
        //     messages: messageHistory,
        //     tools,

        //     system: systemPrompts,
        //     maxRetries: 1,
        //     maxSteps: 3,
        //     onStepFinish: ({ toolCalls, toolResults }) => {
        //         logger("[Tool Calls]:", JSON.stringify(toolCalls, null, 2))
        //         logger("[Tool Results]:", JSON.stringify(toolResults, null, 2))
        //     }
        // });

        // spinner.stop();
        // messageHistory.push({
        //     id: generateId(),
        //     role: "assistant",
        //     content: text
        // })

        // console.log(chalk.blueBright("\nGrand Blue Bot: " + text + '\n'))





    }
}

chat();