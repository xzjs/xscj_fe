import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Admin from '@/components/admin'
import Clas from '../components/clas';
import Teacher from '../components/teacher';
import Course from '../components/course';
import Student from '../components/student';

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
      component: Admin,
      children:[
        {
          path:'clas',
          component:Clas
        },
        {
          path:'teacher',
          component:Teacher
        },
        {
          path:'course',
          component:Course
        },
        {
          path:'student',
          component:Student
        }
      ]
    }
  ]
})
