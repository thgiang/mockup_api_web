
export default {
  router: {
    middleware: ['auth'],
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    //title: process.env.npm_package_name || '',
    title: 'GHTK Mock API',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto Condensed&display=swap' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@assets/css/reset.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/vue-notifications.js',
    '@/plugins/font-awesome.js',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules:  [
    ['@nuxtjs/fontawesome', {
      component: 'fa',
      suffix: true,
    }]
  ],
  fontawesome: {
    icons: {
      solid: true
    }
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  axios: {
    //proxyHeaders: true,
    //proxy: true,
    baseURL: 'http://thgiangapi.com/api',
  },
  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'http://thgiangapi.com',
        token: {
          property: 'access_token',
          maxAge: 7 * 24 * 60 * 60
        },
        refreshToken: {
          maxAge: 7 * 24 * 60 * 60
        },
      }
    }
  },
  loading: {
    color: '#ffbc00',
    height: '2px'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
