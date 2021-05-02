import colors from 'vuetify/es5/util/colors'
import {ru} from 'vuetify/src/locale'
export default {
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - MealAndSeat',
    title: 'MealAndSeat',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"preconnect", href:"https://fonts.gstatic.com"},
      { rel:"stylesheet", href:"https://fonts.googleapis.com/css2?family=Nunito&family=Open+Sans:wght@400;600&family=Roboto:wght@300;400;500;700&display=swap" },
      { rel:"stylesheet", href:"https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/swiper.js', ssr: false },
    { src: '@/plugins/vmask.js', ssr: false },
    { src: '@/plugins/ymaps.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next'

  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    lang: {
      locales: { ru },
      current: 'ru'
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#7C2C6B",
          // accent: colors.grey.darken3,
          secondary: "f35757",
      //     info: colors.teal.lighten1,
      //     warning: colors.amber.base,
          error: "#F35757",
          success: "#489424"
        }
      }
    }
  },
  moment: {
    defaultLocale: 'ru',
    locales: ['ru']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
