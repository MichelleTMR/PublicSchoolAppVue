import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/Register.vue'
import LoginVue from '@/views/Login.vue'
import ParentVue from '@/views/Parent.vue'
import StudentVue from '@/views/Student.vue'
import StudentProfileVue from '@/views/StudentProfile.vue'
import AddressChangeVue from '@/views/AddressChange.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/parent',
      name: 'parentprofile',
      component: ParentVue
    },
    {
      path: '/student',
      name: 'studentview',
      component: StudentVue
    },
    {
      path: '/student/:id',
      name: 'studentprofile',
      component: StudentProfileVue
    },
    {
      path: '/addresschange',
      name: 'addresschange',
      component: AddressChangeVue
    }
  ]
})

export default router
