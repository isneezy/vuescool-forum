import firebase from 'firebase/app'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {},

  mutations: {},

  actions: {
    fetchAllCategories ({commit, state}) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('categories').once('value', snapshot => {
          const categoriesObject = snapshot.val()
          Object.keys(categoriesObject).forEach(id => {
            commit('setItem', {id, resource: 'categories', item: categoriesObject[id]}, {root: true})
          })
          resolve(state.items)
        }, reject)
      })
    },
    fetchCategory: ({dispatch}, {id}) => dispatch('fetchItem', {id, resource: 'categories'}, {root: true})
  }
}
