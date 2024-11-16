<template>
    <div>
        <h1>Home</h1>
        <NuxtLink to="/chat">About page</NuxtLink>


        <div>
            <h2 class="mb-2 text-center text-xl md:text-5xl">
                Ask anything about "Basecamp - Getting Real"
            </h2>
            <p class="mb-16 text-center md:text-2xl">The smarter, faster, easier way to build a successful web
                application</p>


            <div>
                <div class="chat chat-start">
                    <div class="chat-bubble">
                        It's over Anakin,
                        <br/>
                        I have the high ground.
                    </div>
                </div>
                <div class="chat chat-end">
                    <div class="chat-bubble">You underestimate my power!</div>
                </div>
            </div>


            <UiVanishingInput
                v-model="text"
                :placeholders="placeholders"
                fxColor="#a6adbb"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const placeholders = [
    "Why is my code always broken?",
    "What does 'undefined' even mean?",
    "How to center a div (for real this time)",
    "Am I smarter than a compiler?",
    "Do loops ever get dizzy?",
];
const text = ref("");
</script>