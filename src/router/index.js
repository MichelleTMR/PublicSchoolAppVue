import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/Register.vue'
import LoginVue from '@/views/Login.vue'
import ParentVue from '@/views/Parent.vue'
import StudentProfileVue from '@/views/StudentProfile.vue'
import AddressChangeVue from '@/views/AddressChange.vue'
import SchoolInfoVue from '@/views/SchoolInfo.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginVue
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
      path: '/student/:id',
      name: 'studentprofile',
      component: StudentProfileVue
    },
    {
      path: '/addresschange',
      name: 'addresschange',
      component: AddressChangeVue
    },
    {
      path: '/school/:id',
      name: 'school',
      component: SchoolInfoVue
    }
  ]
});

export default router
