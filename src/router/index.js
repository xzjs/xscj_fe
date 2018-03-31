import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Admin from '@/components/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path:'/clas',
      name:
    }
  ]
})
