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
  plugins: [
    '~/plugins/ant-icons',
    "~/plugins/sanityImage",
  ],

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
  modules: [
    '@nuxtjs/style-resources'
  ],
  generate: { fallback: '404.html' },
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
}
