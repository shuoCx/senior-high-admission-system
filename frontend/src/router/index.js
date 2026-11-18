import { createRouter, createWebHistory } from 'vue-router'

/**
 * 路由表。
 *
 * 基础框架阶段只有一个首页；组内协商页面清单后，
 * 在此追加子路由并配合 layout 组件做侧边栏菜单。
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  const base = import.meta.env.VITE_APP_TITLE || '中考招生录取模拟系统'
  document.title = to.meta?.title ? `${to.meta.title} - ${base}` : base
})

export default router