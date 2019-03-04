import Vue from 'vue'

export default {
  setItem (state, {item, resource, id}) {
    item['.key'] = id
    Vue.set(state[resource].items, id, item)
  }
}
