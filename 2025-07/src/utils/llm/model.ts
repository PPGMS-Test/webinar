import { createDeepSeek } from '@ai-sdk/deepseek';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export const getDeepSeekModel = () => {
    //vercel ai 目前所支持的大语言模型: https://ai-sdk.dev/providers/ai-sdk-providers/deepseek
    const provider = createDeepSeek({
        apiKey: process.env.DEEPSEEK_API_KEY ?? '',
    });

    //type DeepSeekChatModelId = "deepseek-chat" | "deepseek-reasoner" 
    // 北京时间00:30~08:30, Deepseek-V3(deepseek-chat)降价50%, Deepseek-R1(deepseek-reasoner)降价25%
    const deepseek = provider('deepseek-chat');
    return deepseek;
}

export const getVolcanoModel = () => {
    // https://www.volcengine.com/docs/82379/1330626
    const provider = createOpenAICompatible({
        // name: 'Doubao-1.5-pro-32k',
        // 这个name的值看起来不影响模型配置
        name: 'My-Test-Doubao-name',
        apiKey: process.env.VOLCENGINE_API_KEY ?? '',
        baseURL: 'https://ark.cn-beijing.volces.com/api/v3/',
    });

    // 这里的'model-id', 对于火山方舟来说, 是endpoint. 因为在'火山引擎'=>'在线推理'=>'推理接入点'中, 可以看到, 一个接入点对应了一个模型
    const volcengine = provider('ep-numberID-xxxxx')
    return volcengine
}
