// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  content: {
    // 可选：配置内容模块
    documentDriven: true,
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
  },
})
