import { makeAppendChildToParentMutation } from '../assetHelpers'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {
  },

  mutations: {
    appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'})
  },

  actions: {
    fetchForums: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, resource: 'forums'}, {root: true}),
    fetchForum: ({dispatch}, {id}) => dispatch('fetchItem', {id, resource: 'forums'}, {root: true})
  }
}
