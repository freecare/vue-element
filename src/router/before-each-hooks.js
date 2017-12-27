export default {
  checkLoginAuth(to, from, next) {
    // 设置页面的title
    if (to.meta.title) {
      document.title = to.meta.title
    }

    // 对设置了requiresAuth的meta路由验证权限
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // 权限验证方法，根据业务需要自行编写
      let permission = getPermission()

      if (!permission) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      // 不需要权限的路由，一定要调用 next()
      next()
    }

    function getPermission() {
      // ...验证权限

      return true
    }
  }
}
