import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import auth from './modules/auth'
import categories from './modules/categories'
import forums from './modules/forums'
import posts from './modules/posts'
import threads from './modules/threads'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  mutations,
  actions,
  getters,
  modules: {auth, categories, forums, threads, posts, users}

})
