import { createRouter, createWebHistory } from 'vue-router'

let routes = []
const modules = import.meta.glob('./modules/*.js', { eager: true })
for (const path in modules) {
  const moduleName = path.match(/\.\/modules\/(.*)\.js$/)[1]
  let moduleRoute = modules[path].default.map((item) => {
    return {
      ...item,
      path: `/${moduleName}${item.path}`,
    }
  })
  routes.push(...moduleRoute)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Index.vue'),
    },
    {
      path: '/',
      name: 'Layout',
      redirect: '/home',
      component: () => import('@/components/Layout.vue'),
      meta: {
        title: '首页',
      },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/home/Index.vue'),
        },
        ...routes,
      ],
    },
  ],
})

export default router
