/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/common',
        name: 'Common',
        component: () => import('@/views/common/index'),
        meta: { title: '公共页', keepAlive: false }
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/chooseCity',
        name: 'ChooseCity',
        component: () => import('@/views/home/chooseCity'),
        meta: { title: '城市选择', keepAlive: false }
      },
      {
        path: '/schedule',
        name: 'Schedule',
        component: () => import('@/views/home/schedule'),
        meta: { title: '班次', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false }
      }
    ]
  }
]
