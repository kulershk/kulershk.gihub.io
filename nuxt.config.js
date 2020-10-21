export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'OSRS Simulator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {name: 'twitter:card', content: 'summary'},
      {name: 'twitter:title', content: 'Vue Social Cards Example'},
      {name: 'twitter:description', content: 'Vue sample site showing off Twitter and Facebook Cards.'},
      // image must be an absolute path
      {name: 'twitter:image', content: "https://cdn.discordapp.com/emojis/482568707541827594.png?"},
      // Facebook OpenGraph
      {property: 'og:title', content: 'Vue Social Cards Example'},
      {property: 'og:site_name', content: 'Vue Example'},
      {property: 'og:type', content: 'website'},
      {property: 'og:image', content:  "https://cdn.discordapp.com/emojis/482568707541827594.png?"},
      {property: 'og:description', content: 'Vue sample site showing off Twitter and Facebook Cards.'}
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~plugins/ga.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-seo',
  ],

  seo: {
    // Module options
    baseUrl: 'https://kulershk.github.io/',
    name: 'OSRS Drop',
    title: 'Simulator',
    templateTitle: '%name% - %title%',
    description: 'Try your possible luck',
    image: "https://cdn.discordapp.com/emojis/482568707541827594.png"
    //...
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
