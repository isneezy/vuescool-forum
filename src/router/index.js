import Vue from 'vue'
import Router from 'vue-router'
import Home from '@views/PageHome'
import ThreadShow from '@views/PageThreadShow'
import NotFound from '@views/PageNotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/thread/:id',
      name: 'threadShow',
      component: ThreadShow,
      props: true
    },

    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
