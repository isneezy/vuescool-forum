import Vue from 'vue'
import firebase from 'firebase'
import App from './App'
import router from './router'
import store from './store'

import AppDate from './components/AppDate'

Vue.component('app-date', AppDate)

Vue.config.productionTip = false

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyB89QwflwRgyXkllFdR7ZcTofuCt12iWg0',
  authDomain: 'vue-school-forum-9dd3f.firebaseapp.com',
  databaseURL: 'https://vue-school-forum-9dd3f.firebaseio.com',
  projectId: 'vue-school-forum-9dd3f',
  storageBucket: 'vue-school-forum-9dd3f.appspot.com',
  messagingSenderId: '381885373373'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
