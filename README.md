# 基于 vue-cli 的前端快速构建框架

> 基于 vue-cli 构建，集合了 vuex, axios, vue-router, element-ui, font-awesome, bootstrap4(只引入样式) 插件。

## 插件列表

 - [node.js](https://nodejs.org/zh-cn/)
 - [webpack](http://webpack.github.io/) [(docs)](http://webpack.github.io/docs/)
 - [vue](https://cn.vuejs.org/v2/guide/)
 - [vue-router](https://router.vuejs.org/zh-cn/)
 - [vuex](https://vuex.vuejs.org/zh-cn/)
 - [axios](https://github.com/axios/axios)
 - [element-ui 2](http://element-cn.eleme.io/#/zh-CN)
 - [font-awesome](http://fontawesome.io/icons/)
 - [bootstrap 4](https://v4.bootcss.com/)

## 主要特性

 - js 由 vue-router 分块异步加载 `r => require.ensure([], () => r(require('Component')), 'chunkname')`，有效控制首屏加载速度
 - 公用 css 抽取，用 postcss 处理兼容问题，组件样式用 scoped 属性，不污染其他组件样式
 - 开发模式热加载，默认地址：localhost:8080，端口号在文件 `/build/config/index.js` 中修改
 - 本地代理 ajax 请求，防止AJAX跨域问题，可保持与生产环境的 API 路径一致
 - es6 编写代码，浏览器兼容性：IE9+（包括IE9）

## 目录结构

 - `build` webpack 公用配置目录
 - `config` webpack 开发和生产环境的配置，包括 api 代理配置
 - `src` 项目所有前端页面的源文件
 - `src/api` 接口配置及列表
 - `src/assets` 包括 css, 图片，其他js插件等
 - `src/components` vue单元组件，不包括页面组件
 - `src/router` vue-router 路由配置及列表
 - `src/store` vuex 全局状态管理的配置
 - `src/utils` 自定义的全局方法，如时间、字符串及业务需要的通用方法
 - `src/views` 页面组件，一般一个路由一个组件（根据业务复杂度也可以与components合并）

## 构建步骤

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 具体配置项

> 基于 vue-cli 脚手架构建，具体配置项有：

 - [1、vue-cli 生成项目基本结构](#anchor1)
 - [2、API代理](#anchor2)
 - [3、配置 vue-router](#anchor3)
 - [4、配置 vuex](#anchor4)
 - [5、引入 axios](#anchor5)
 - [6、配置全局工具函数 utils](#anchor6)
 - [7、全局引入 element-ui](#anchor7)
 - [8、引入样式及字体图标](#anchor8)

<h3 id="anchor1">1、vue-cli 生成项目基本结构</h3>

``` bash
npm install -g vue-cli

vue init webpack vue-element
```

生成中，选择使用 `vue-router` 及 `eslint`，不使用单元测试

<h3 id="anchor2">2、API代理</h3>

在 `config` 目录下新建文件 `proxy.js`，添加 `http-proxy-middleware` 远程API接口

``` bash
const api = [
  '/auth',
  '/api'
]

const option = {
  target: 'http://some-domain.com',
  changeOrigin: true
}

let proxy = {}
api.forEach(item => { proxy[item] = option })

module.exports = proxy
```

修改 `config` 目录中的 `index.js` 配置：proxyTable，并把 `autoOpenBrowser` 置为 `true`

``` bash
const proxy = require('./proxy')

...

dev: {
  ...
  proxyTable: proxy,
  autoOpenBrowser: true,
  ...
}
```

<h3 id="anchor3">3、配置 vue-router</h3>

更改 `router` 目录下的 `index.js` 文件，加上勾子函数及路由配置

``` bash
// 静态路由
import routes from './routes'

// 路由跳转前的勾子函数，可做权限验证、动画、浏览器导航历史记录等
import beforeEachHooks from './before-each-hooks'

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
```

`before-each-hooks.js` 中处理页面title和权限验证

``` bash
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
```

然后在 `routes` 中为需要权限验证的路由添加 `meta` 元信息

``` bash
path: '/admin',
component: r => require.ensure([], () => r(require('@/views/Admin')), 'app-admin'),
meta: {
  requiresAuth: true,
  // 根据业务设置权限信息
  authorization: 'org_corp,org_admin'
}
```

<h3 id="anchor4">4、配置 vuex</h3>

（1）安装 `vuex`

`npm install -S vuex`

（2）在 `src` 目录下新建 `store` 目录，在其中新建 `modules` 目录和 `index.js` 文件

``` bash
// 获取 ./modules 目录下所有文件，作为 vuex 的一个模块
const files = require.context('./modules/', true, /\.js$/)
...

export default new Vuex.Store({
  modules: modules,
  strict: process.env.NODE_ENV !== 'production'
})
```

`modules` 目录中的文件格式参考 vuex 官网：

``` bash
// 包含了全部的应用层级状态，全局访问 this.$store.state.
// 虽然将所有的状态放到Vuex会使状态变化更易显示和易调试，但也会使代码变得冗长和不直观。
// 如果有些状态严格属于单个组件，最好还是作为组件的本地状态。
const state = {
  token: null
}

// store 的计算属性，全局访问 this.$store.getters.
const getters = {
  userToken: state => state.token
}

// Action 类似于 mutation，不同在于：
// Action 提交的是 mutation，而不是直接变更状态
// Action 可以包含任意异步操作
// 全局访问 this.$store.dispatch('')
const actions = {
  getToken({ commit }) {
    // 可包含异步请求等函数，最后调用 commit 更改状态
    setTimeout(() => {
      commit('userToken', 'my_token')
    }, 300)
  }
}

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
// mutation 必须是同步函数
// 全局访问 this.$store.commit('...', value)
const mutations = {
  userToken: (state, payload) => {
    state.token = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
```

（3）在主文件 `main.js` 中引入：

``` bash
import store from './store'

new Vue({
  ...
  store,
  ...
})
```

<h3 id="anchor5">5、引入 axios</h3>

（1）安装 axios

`npm install -S axios vue-axios`

（2）在 `src` 下新建 `api` 目录，并新建 `axios.js` 文件

``` bash
const service = axios.create({
  timeout: 30000
  // baseURL: 'https://some-domain.com/api/',
  // headers: {'X-Requested-With': 'XMLHttpRequest'}
})

// http request 拦截器
service.interceptors.request.use(config => {
  // ...
  return config
}, err => {
  return Promise.reject(err)
})

// http response 响应拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // 异常的全局处理
    // ...
    return Promise.reject(error.response)
  }
)

export default service
```

（3）在主文件 `main.js` 中引入：

``` bash
import VueAxios from 'vue-axios'
import axios from './api/axios'

// 组件中使用 this.$http 调用 axios
Vue.use(VueAxios, axios)
```

若统一管理API接口，可将接口配置全放于 `api` 目录，使用时按需导入

<h3 id="anchor6">6、配置全局工具函数 utils</h3>

（1）在 `src` 中新建 `utils` 目录，并新建 `index.js` 文件：

``` bash
// 动态引入 utils 下的所有文件，添加到全局 uitls 对象下
const files = require.context('.', true, /\.js$/)

let utils = {}
files.keys().forEach(key => {
  if (key === './index.js') return
  for (let k in files(key).default) {
    utils[k] = files(key).default[k]
  }
})

const install = function (Vue) {
  if (install.installed) return

  // 设置 Vue 全局对象，在组件中可用 this.$utils 引用
  Vue.prototype.$utils = utils
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
```

（2）在 `main.js` 中引入，在组件中就可以用 `this.$utils` 调用

``` bash
import utils from './utils'

Vue.use(utils)
```

<h3 id="anchor7">7、全局引入 element-ui（也可以不在这里引入，在组件按需引入）</h3>

``` bash
import ElementUI from 'element-ui'

Vue.use(ElementUI)
```

<h3 id="anchor8">8、引入样式及字体图标</h3>

项目采用 scss 作为默认的样式预处理器，并引入 `bootstrap 4 font-awesome element-ui`样式，在 `assets` 中新建 `scss` 目录，新按 scss 样式构建样式文件：

（1）安装插件

`npm install -S bootstrap@4.0.0-beta.2 font-awesome`

（2）新建 `_variables.scss`，设置样式的全局变量，可覆盖 `bootstarp element-ui`变量

``` bash
$primary:           #57b231;

$body-bg:           #f9f9f9;
$font-family-base:  Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif !default;  
```

（3）新建 `index.scss` 并引入样式

``` bash
@import 'variables.scss';

// 引入 bootstrap
@import "../../../node_modules/bootstrap/scss/bootstrap.scss";

// 引入 element-ui
// 改变主题色变量
$--color-primary: #57b231;
// 改变icon 字体路径变量，必需
$--font-path: '../../../node_modules/element-ui/lib/theme-chalk/fonts';
@import "../../../node_modules/element-ui/packages/theme-chalk/src/index";

// 引入 font-awesome
// 改变 icon 字体路径变量，必需
$fa-font-path: '../../../node_modules/font-awesome/fonts';
@import "../../../node_modules/font-awesome/scss/font-awesome.scss";
```

（4）在 `main.js` 中引入 `import '@/assets/scss/index.scss'`，组件中的样式写在 `style` 标签中，并加上 `scoped` 属性
