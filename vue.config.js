module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        views: '@/views',
        network: '@/network'
      }
    },

    externals: {
      vue: 'Vue',
      echarts: 'echarts',
      axios: 'axios',
      'vue-router': 'VueRouter'
    }
  },

  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],

  

}