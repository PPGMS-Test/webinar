import { config } from '@dotenvx/dotenvx';
import { getDeepSeekModel, getVolcanoModel } from '@utils/llm/model';
import { generateText, streamText } from 'ai';
import chalk from 'chalk';

const envFilePath = process.env.ENV_FILE_PATH;
config({ path: envFilePath })


const llm = getDeepSeekModel();

const main = async () => {
  console.log('[main is called]')


  // const { text } = await generateText({
  //   model: llm,
  //   prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  // });

  // console.log(chalk.blueBright(text))

  const result = streamText({
    model: llm,
    prompt: 'Say hello in Chinese',
  });


  for await (const textPart of result.textStream) {
    process.stdout.write(chalk.blueBright(textPart));
  }
}

main();