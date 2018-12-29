import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import AppDate from './components/AppDate'

Vue.component('app-date', AppDate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
