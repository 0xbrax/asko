<template>
    <div id="home" class="h-full pt-16 pb-4 flex flex-col justify-between gap-8">
        <div class="text-center">
            <h2 class="mb-2 text-xl md:text-5xl">
                Ask anything about
                <UiTextHighlight
                    class="bg-gradient-to-r from-primary to-secondary p-2"
                    text-end-color="oklch(var(--pc))"
                    :delay="1000"
                >
                    Basecamp - Getting Real
                </UiTextHighlight>
            </h2>
            <p class="text-sm md:text-2xl">The smarter, faster, easier way to build a successful web
                application</p>
        </div>


        <div class="grow overflow-y-auto relative">
            <LucideTrash class="sticky top-0 left-1/2 translate-x-1/2"/>

            <div
                v-for="(message, index) in messages"
                :key="index"
                :ref="index === messages.length - 1 ? (el) => lastMessageRefs.push(el) : null"
            >
                <div v-if="message.role === 'assistant'" class="chat chat-start">
                    <div class="chat-bubble whitespace-pre-wrap">{{ message.text }}</div>
                </div>

                <div v-if="message.role === 'user'" class="chat chat-end">
                    <div class="chat-bubble whitespace-pre-wrap">{{ message.text }}</div>
                </div>
            </div>
        </div>


        <div>
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

const prompt = ref('');
const messages = ref([]);

const placeholders = [
    "Why is my code always broken?",
    "What does 'undefined' even mean?",
    "How to center a div (for real this time)",
    "Am I smarter than a compiler?",
    "Do loops ever get dizzy?",
];

const lastMessageRefs = ref([]);

const sendPrompt = async () => {
    try {
        const {data, error} = await $fetch('/api/assistant', {
            method: 'POST',
            body: {prompt: prompt.value},
        });

        if (error) {
            throw new Error(error.message);
        }

        console.log('RESPONSE LENGTH', data.length)

        const temp = [];
        for (const message of data.reverse()) {
            console.log('- - - - - - - MESSAGGIO - - - - - - - - - - -')

            console.log(`${message.role} > ${message.content[0].text.value}`);

            const obj = {
                role: message.role,
                text: message.content[0].text.value
            };
            temp.push(obj);
        }
        messages.value = temp;
    } catch (error) {
        console.error(error);
    } finally {
        //
    }
};


watch(
    () => messages.value.length,
    async () => {
        await nextTick();

        console.log('LOG - -  - -', lastMessageRefs.value)

        lastMessageRefs.value[lastMessageRefs.value.length - 1].scrollIntoView({behavior: 'smooth'});
    }
);
</script>