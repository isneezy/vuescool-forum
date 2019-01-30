import Vue from 'vue'
import Router from 'vue-router'
import Home from '@views/PageHome'
import ThreadShow from '@views/PageThreadShow'
import ThreadCreate from '@views/PageThreadCreate'
import ThreadEdit from '@views/PageThreadEdit'
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
      path: '/thread/create/:forumId',
      name: 'threadCreate',
      component: ThreadCreate,
      props: true
    },
    {
      path: '/thread/:id/edit',
      name: 'threadEdit',
      component: ThreadEdit,
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
      path: '/me/edit',
      name: 'profileEdit',
      component: Profile,
      props: {edit: true}
    },

    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
