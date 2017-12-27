export default [
  {
    path: '/',
    component: r => require.ensure([], () => r(require('@/views/Home')), 'app-index')
  }, {
    path: '/Home',
    component: r => require.ensure([], () => r(require('@/views/Home')), 'app-index')
  }, {
    path: '/Build',
    component: r => require.ensure([], () => r(require('@/views/Build')), 'app-build')
  }, {
    path: '/Icon',
    component: r => require.ensure([], () => r(require('@/views/Icon')), 'app-icon')
  }, {
    path: '/Css',
    component: r => require.ensure([], () => r(require('@/views/Css')), 'app-css')
  }, {
    path: '/ElementUI',
    component: r => require.ensure([], () => r(require('@/views/Element')), 'app-element')
  },

  // 无路由时跳转到error，需要后台nginx配置
  {
    path: '*',
    component: r => require.ensure([], () => r(require('@/views/Error')), 'app-error')
  }
]
