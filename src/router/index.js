import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import AdminHome from '@/components/adminpages/AdminHome'
import TeacherHome from '@/components/teacherpages/TeacherHome'
import StudentHome from '@/components/studentpages/StudentHome'
import CourseAdd from '@/components/adminpages/CourseAdd'
import CourseInfo from '@/components/adminpages/CourseInfo'
import RoomInfoInquire from '@/components/adminpages/RoomInfoInquire'
import StudentInfoManage from '@/components/adminpages/StudentInfoManage'
import TeacherInfoManage from '@/components/adminpages/TeacherInfoManage'

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
      redirect: '/adminHome/CourseInfo',
      component: AdminHome,
      children:[
        {
          path: '/adminHome/CourseAdd',
          component: resolve => require(['../components/adminpages/CourseAdd'],resolve)
        },
        {
          path: '/adminHome/CourseInfo',
          component: resolve => require(['../components/adminpages/CourseInfo'],resolve)
        },
        {
          path: '/adminHome/RoomInfoInquire',
          component: resolve => require(['../components/adminpages/RoomInfoInquire'],resolve)
        },
        {
          path: '/adminHome/StudentInfoManage',
          component: resolve => require(['../components/adminpages/StudentInfoManage'],resolve)
        },
        {
          path: '/adminHome/TeacherInfoManage',
          component: resolve => require(['../components/adminpages/TeacherInfoManage'],resolve)
        }
      ]
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
