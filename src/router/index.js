import Vue from 'vue'
import Router from 'vue-router'
import Home from '@views/PageHome'
import ThreadShow from '@views/PageThreadShow'
import Forum from '@views/PageForum'
import Profile from '@views/PageProfile'
import NotFound from '@views/PageNotFound'
import CategoryShow from '../views/PageCategory'

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
      path: '/category/:id',
      name: 'category',
      component: CategoryShow,
      props: true
    },
    {
      path: '/forum/:id',
      name: 'forum',
      component: Forum,
      props: true
    },
    {
      path: '/thread/:id',
      name: 'threadShow',
      component: ThreadShow,
      props: true
    },

    {
      path: '/me',
      name: 'profile',
      component: Profile,
      props: true
    },

    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
