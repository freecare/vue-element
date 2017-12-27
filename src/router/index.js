import Vue from 'vue'
import Router from 'vue-router'

// 静态路由
import routes from './routes'

// 路由跳转前的勾子函数，可做权限验证、动画、浏览器导航历史记录等
import beforeEachHooks from './before-each-hooks'

Vue.use(Router)

let router = new Router({
  // 去掉url上的/#/号，需要后台(nginx等)做相应配置：404时配置到/index.html，由vue的前端路由*处理
  mode: 'history',

  // router-link匹配路由时的样式，用于选中时的样式处理
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',

  // 静态路由
  routes: routes,

  // 路由跳转时，返回到顶部
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition || { x: 0, y: 0 }
  }
})

// 路由勾子数据
Object.keys(beforeEachHooks).forEach(hook => {
  router.beforeEach(beforeEachHooks[hook])
})

export default router
