import { createMemoryHistory, createRouter } from 'vue-router'

import UserTable from '@/components/UserTable.vue'

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
