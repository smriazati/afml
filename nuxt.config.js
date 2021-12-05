export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s | Advocates for Minor Leaguers",
    title: 'Advocates for Minor Leaguers',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    // script: [
    //   {
    //     src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"
    //   },
    //   {
    //     src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/ScrollTrigger.min.js"
    //   },
    // ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/sass/main.scss'
  ],
  styleResources: {
    scss: [
      '~/assets/sass/system/_colors.scss',
      '~/assets/sass/system/_typography.scss',
      '~/assets/sass/system/_spacing.scss',
      '~/assets/sass/system/_buttons.scss'
    ],
    hoistUseStatements: true  
},
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/antd-ui',
    "~/plugins/sanityImage.js",
    "~/plugins/route.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/sanity/module', '@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      'Roboto Condensed': {
        wght: [700],
        ital: [700]
      },
      'Roboto': {
        wght: [400],
      },
      'Montserrat': {
        wght: [500],
      },
      'EB Garamond': {
        wght: [400],
      }
    },
    display: 'swap',
    prefetch: true,
    preconnect: true
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  generate: { fallback: '404.html' },

  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
}
