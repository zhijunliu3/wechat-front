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
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '我的', keepAlive: false }
      }
    ]
  },
  {
    path: '/common',
    name: 'Common',
    component: () => import('@/views/common/index'),
    meta: { title: '公共页', keepAlive: false }
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
    meta: { title: '班次' }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/order/index'),
    meta: { title: '订单', keepAlive: false }
  },
  {
    path: '/order-detail',
    name: 'OrderDetail',
    component: () => import('@/views/order/detail'),
    meta: { title: '订单详情', keepAlive: false }
  },
  {
    path: '/preorder',
    name: 'Preorder',
    component: () => import('@/views/order/preorder'),
    meta: { title: '预订单', keepAlive: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/register'),
    meta: { title: '用户注册', keepAlive: true }
  },
  {
    path: '/memberProtocol',
    name: 'MemberProtocol',
    component: () => import('@/views/user/memberProtocol'),
    meta: { title: '会员协议', keepAlive: false }
  },
  {
    path: '/privateProtocol',
    name: 'PrivateProtocol',
    component: () => import('@/views/user/privateProtocol'),
    meta: { title: '隐私协议', keepAlive: false }
  },
  {
    path: '/bind',
    name: 'Bind',
    component: () => import('@/views/user/bind'),
    meta: { title: '用户绑定', keepAlive: false }
  },
  {
    path: '/mycar',
    name: 'MyCar',
    component: () => import('@/views/car/index'),
    meta: { title: '我的汽车', keepAlive: false }
  },
  {
    path: '/trip',
    name: 'Trip',
    component: () => import('@/views/car/trip'),
    meta: { title: '我的行程', keepAlive: false }
  },
  {
    path: '/trip-detail',
    name: 'TripDetail',
    component: () => import('@/views/car/detail'),
    meta: { title: '行程详情', keepAlive: false }
  }
]
