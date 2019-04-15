import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import AdminHome from '@/components/adminpages/AdminHome'
import TeacherHome from '@/components/teacherpages/TeacherHome'
import StudentHome from '@/components/studentpages/StudentHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/adminHome',
      name: 'AdminHome',
      component: AdminHome
    },
    {
      path: '/teacherHome',
      name: 'TeacherHome',
      component: TeacherHome
    },
    {
      path: '/StudentHome',
      name: 'StudentHome',
      component: StudentHome
    }

  ]
})
