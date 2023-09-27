import { OpenAI } from 'openai';
import { parseCommonArgs } from './utils';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { ChatCompletionCreateParamsStreaming } from 'openai/resources/chat';

const args = parseCommonArgs();
const configuration = {
  organization: args.ORG,
  apiKey: args.OPENAI_API_KEY,
};
const openai = new OpenAI({
  ...configuration,
  httpAgent: new HttpsProxyAgent('http://127.0.0.1:7890'),
});

export const chatWithGPT = (
  content: string,
  options?: ChatCompletionCreateParamsStreaming
) => {
  return openai.chat.completions
    .create({
      model: 'gpt-4',
      messages: [{ role: 'user', content }],
      stream: true,
      ...options,
    })
    .then(async (stream) => {
      let total = '';
      for await (const part of stream) {
        total += part.choices[0]?.delta?.content ?? '';
      }
      return total;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
