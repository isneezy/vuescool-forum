import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

import Home from '@views/PageHome'
import ThreadShow from '@views/PageThreadShow'
import ThreadCreate from '@views/PageThreadCreate'
import ThreadEdit from '@views/PageThreadEdit'
import CategoryShow from '../views/PageCategory'
import Forum from '@views/PageForum'
import Profile from '@views/PageProfile'
import SignIn from '@views/PageSignIn'
import Register from '@views/PageRegister'
import NotFound from '@views/PageNotFound'

Vue.use(Router)

const router = new Router({
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
      props: true,
      meta: {requiresAuth: true}
    },
    {
      path: '/thread/:id/edit',
      name: 'threadEdit',
      component: ThreadEdit,
      props: true,
      meta: {requiresAuth: true}
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
      props: true,
      meta: {requiresAuth: true}
    },

    {
      path: '/me/edit',
      name: 'profileEdit',
      component: Profile,
      props: {edit: true},
      meta: {requiresAuth: true}
    },

    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta: {requiresGuest: true}
    },

    {
      path: '/logout',
      name: 'signout',
      meta: {requiresAuth: true},
      beforeEnter (to, from, next) {
        store.dispatch('signOut')
          .then(() => next({name: 'home'}))
      }
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {requiresGuest: true}
    },

    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(`🚦 navigating to ${to.name} from ${from.name}`)
  store.dispatch('initAuthentication').then(user => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      if (user) {
        next()
      } else {
        next({name: 'signin', query: {redirectTo: to.path}})
      }
    } else if (to.matched.some(route => route.meta.requiresGuest)) {
      if (!user) {
        next()
      } else {
        next({name: 'home'})
      }
    } else {
      next()
    }
  })
})

export default router
