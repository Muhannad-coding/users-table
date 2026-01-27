import { createWebHistory, createRouter } from 'vue-router'

import UserTable from '@/components/features/users/UsersTable.vue'

const routes = [
  {
    path: '/',
    component: UserTable,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
