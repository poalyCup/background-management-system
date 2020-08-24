import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import RolesPowerDetail from './views/power/RolesPowerDetail'

Vue.config.productionTip = false

Vue.component('RolesPowerDetail', RolesPowerDetail)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
