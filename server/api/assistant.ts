import OpenAI from "openai";

const openai = new OpenAI();

let cachedThread: any = null;
const getThread = async () => {
    if (!cachedThread) {
        cachedThread = await openai.beta.threads.create();
    }
    return cachedThread;
};

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);

    if (!body.prompt) {
        return {error: 'No prompt provided'};
    }

    try {
        if (body.needsReset) {
            cachedThread = null;
        }
        const thread = await getThread();

        const message = await openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: body.prompt
            }
        );
        const run = await openai.beta.threads.runs.createAndPoll(
            thread.id,
            {
                assistant_id: config.openaiCustomAssistantId,
            }
        );

        if (run.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(
                run.thread_id
            );
            return {data: messages.data};
        } else {
            return {error: `Failed to fetch GPT response, status: ${run.status}`};
        }
    } catch (error) {
        return {error: `Failed to fetch GPT response, error: ${error}`};
    }
});
