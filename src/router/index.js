import { createMemoryHistory, createRouter } from 'vue-router'

import UserTable from '@/components/features/users/UsersTable.vue'

const routes = [
  {
    path: '/',
    component: UserTable,
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
