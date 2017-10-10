import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Join from '../components/Join.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Join
    },
    {
      path: '/chat',
      component: Home,
      meta: { requiresUser: true }
    },
    {
      path: '/*',
      redirect: '/'
    }
  ],
  mode: 'history',
  
})
