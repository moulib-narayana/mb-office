export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                translate: "no",
                lang: "en",
            },
            title: "MB Office",
        },
    },

    devtools: { enabled: true },

    ssr: true,

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler",
                },
            },
        },
    },

    compatibilityDate: "2024-09-06",
})
