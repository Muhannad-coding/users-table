import { createMemoryHistory, createRouter } from 'vue-router'

import UserTable from '@/components/UserTable.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    components: UserTable,
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
