import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import RolesPowerDetail from './views/power/RolesPowerDetail'

Vue.config.productionTip = false

Vue.component('RolesPowerDetail', RolesPowerDetail)

Vue.filter('dateFormat', function(value){
  const date = new Date(value)
  const y = date.getFullYear()
  const m = (date.getMonth() + '').padStart(2, '0')
  const d = (date.getDay() + '').padStart(2, '0')
  const hh = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
