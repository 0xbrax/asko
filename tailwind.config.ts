import type {Config} from "tailwindcss";
import animate from "tailwindcss-animate";
import {setupInspiraUI} from "@inspira-ui/plugins";
import daisyui from "daisyui"

export default {
    plugins: [animate, setupInspiraUI, daisyui],
    darkMode: "selector",
    safelist: ["dark"],
    prefix: "",
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            'dark'
        ]
    },
} satisfies Config;


