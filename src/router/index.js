import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Admin from '@/components/admin/admin'
import Clas from '../components/admin/clas';
import Teacher from '../components/admin/teacher';
import Course from '../components/admin/course';
import Student from '../components/admin/student';
import Grade from '../components/admin/grade';
import _Teacher from '../components/teacher';
import Nav from "../components/nav";
import Index from '../components/admin/index'
import _Student from '../components/student';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/nav',
      component: Nav,
      children: [
        {
          path: 'admin',
          component: Admin,
          children: [
            {
              path: 'index',
              component: Index
            },
            {
              path: 'clas',
              component: Clas
            },
            {
              path: 'teacher',
              component: Teacher
            },
            {
              path: 'course',
              component: Course
            },
            {
              path: 'student',
              component: Student
            },
            {
              path: 'grade',
              component: Grade
            }
          ]
        },
        {
          path: 'teacher',
          component: _Teacher
        },
        {
          path:'student',
          component:_Student
        }
      ]
    }]
})
