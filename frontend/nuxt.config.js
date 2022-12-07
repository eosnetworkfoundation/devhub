export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/variables.scss',
    '~/assets/css/styles.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api.service',
    '~/plugins/v-click-outside',
    '~/plugins/common',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/markdownit',
    'vue-social-sharing/nuxt',
  ],
  auth: {
    redirect: {
      login: '/', // redirect user when not connected
      logout: '/logout',
      callback: '/'
    },
    strategies: {
      local: false,
      auth0: {
        domain: 'devhub.us.auth0.com',
        clientId: 'C3CbaWj25DapUHSYarwKWAvGT1StkIgM',
        logoutRedirectUri: 'https://learn.eosnetwork.com',
        redirectUri: 'https://learn.eosnetwork.com',
      }
    }
  },

  publicRuntimeConfig: {
    BACKEND_API: process.env.BACKEND_API || 'http://localhost:3001'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  markdownit: {
    runtime: true,
    preset: 'default',
    linkify: true,
    breaks: true,
    use: [
      // 'markdown-it-div',
      // 'markdown-it-attrs'
    ]
  }
}
