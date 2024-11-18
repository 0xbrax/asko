// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    //devtools: {enabled: true},
    css: ['./assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    app: {
        pageTransition: {name: 'page', mode: 'out-in'}
    },
    ssr: false,
    runtimeConfig: {
        openaiApiKey: process.env.OPENAI_API_KEY,
        openaiCustomAssistantId: process.env.OPENAI_CUSTOM_ASSISTANT_ID,

        public: {
            //varName: process.env.NUXT_PUBLIC_VAR_NAME,
        },
    },
    nitro: {
        vercel: {
            functions: {
                maxDuration: 60,
            },
        },
    },
})
