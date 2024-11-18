<template>
    <div id="home" class="h-full py-4 flex flex-col justify-between gap-8">
        <div class="text-center">
            <h2 class="mb-2 text-xl md:text-4xl">
                Ask anything about
                <UiTextHighlight
                    class="bg-gradient-to-r from-primary to-secondary p-2 rounded"
                    text-end-color="oklch(var(--pc))"
                    :delay="1000"
                >
                    Basecamp - Getting Real
                </UiTextHighlight>
            </h2>
            <p class="text-sm md:text-xl">The smarter, faster, easier way to build a successful web
                application</p>
        </div>


        <div class="grow overflow-y-auto relative mx-auto w-full md:w-3/4 p-2 bg-accent/10 rounded">
            <LucideTrash
                v-if="messages.length"
                @click="resetThread"
                class="sticky z-10 top-0 left-1/2 -translate-x-1/2 cursor-pointer text-accent"
            />

            <div
                v-for="(message, index) in messages"
                :key="index"
                :ref="index === messages.length - 1 ? (el) => messageRef['last'] = el : null"
            >
                <div v-if="message.role === 'assistant'" class="chat chat-start">
                    <div class="chat-bubble whitespace-pre-wrap">{{ message.text }}</div>
                </div>

                <div v-if="message.role === 'user'" class="chat chat-end">
                    <div class="chat-bubble whitespace-pre-wrap">{{ message.text }}</div>
                </div>
            </div>


            <div
                v-show="isLoading"
                class="flex justify-center"
            >
                <div class="h-[100px] w-[100px] overflow-hidden flex justify-center items-center">
                    <UiRipple
                        circle-class="border-[hsl(var(--primary))] rounded-full"
                        :number-of-circles="5"
                        :base-circle-size="15"
                        :space-between-circle="15"
                        :base-circle-opacity="1"
                        :circle-opacity-downgrade-ratio="0.2"
                    />
                </div>
            </div>
        </div>


        <div class="w-full flex justify-center">
            <UiVanishingInput
                v-model="prompt"
                :placeholders="placeholders"
                fxColor="#a6adbb"
                @submit="sendPrompt"
            />
        </div>
    </div>
</template>

<script setup>
import {LucideTrash} from "lucide-vue-next";


// TODO
const placeholders = [
    "Why is my code always broken?",
    "What does 'undefined' even mean?",
    "How to center a div (for real this time)",
    "Am I smarter than a compiler?",
    "Do loops ever get dizzy?",
];

const prompt = ref('');
const messages = ref([]);
const messageRef = reactive({});
const isLoading = ref(false);
const needsReset = ref(false);

const sendPrompt = async () => {
    if (isLoading.value) return;

    try {
        isLoading.value = true;

        const messageObj = {
            role: 'user',
            text: prompt.value
        }
        messages.value.push(messageObj);

        const {data, error} = await $fetch('/api/assistant', {
            method: 'POST',
            body: {prompt: prompt.value, needsReset: needsReset.value},
        });

        if (error) {
            throw new Error(error.message);
        }

        for (const message of data.reverse()) {
            //console.log(`${message.role} > ${message.content[0].text.value}`);

            if (message.role === 'user') {
                continue;
            }
            if (messages.value.some(el => el.id === message.id)) {
                continue;
            }

            const messageObj = {
                id: message.id,
                role: message.role,
                text: message.content[0].text.value
            };
            messages.value.push(messageObj);
        }
    } catch (error) {
        console.error(error);
    } finally {
        needsReset.value = false;
        isLoading.value = false;
    }
};

const resetThread = () => {
    if (isLoading.value || needsReset.value) return;

    messages.value = [];
    needsReset.value = true;
};


watch(
    () => messages.value.length,
    async () => {
        if (!messages.value.length) return;
        await nextTick();
        messageRef.last.scrollIntoView({behavior: 'smooth'});
    }
);
</script>