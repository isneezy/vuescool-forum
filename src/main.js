import Vue from 'vue'
import App from './App'
import router from './router'

import AppDate from './components/AppDate'

Vue.component('app-date', AppDate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
