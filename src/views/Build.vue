<template>
  <div class="container">
    <div class="card mb-3">
      <div class="card-body">
        <h4 class="mt-3">
          <b>项目搭建过程</b>
        </h4>
        <hr>

        <p>基于 vue-cli 脚手架构建，记录一下配置的过程</p>

        <ul>
          <li>
            <a href="#anchor1">1、vue-cli 生成项目基本结构</a>
          </li>
          <li>
            <a href="#anchor2">2、API代理</a>
          </li>
          <li>
            <a href="#anchor3">3、配置 vue-router</a>
          </li>
          <li>
            <a href="#anchor4">4、配置 vuex</a>
          </li>
          <li>
            <a href="#anchor5">5、引入 axios</a>
          </li>
          <li>
            <a href="#anchor6">6、配置全局工具函数 utils</a>
          </li>
          <li>
            <a href="#anchor7">7、全局引入 element-ui</a>
          </li>
          <li>
            <a href="#anchor8">8、引入样式及字体图标</a>
          </li>
        </ul>

        <h5 class="font-weight-bold"
            id="anchor1">1、vue-cli 生成项目基本结构</h5>
        <pre class="border rounded bg-light">
    
          npm install -g vue-cli

          vue init webpack vue-element
        </pre>
        <p>生成中，选择使用
          <code>vue-router</code> 及
          <code>eslint</code>，不使用单元测试</p>

        <h5 class="font-weight-bold"
            id="anchor2">2、API代理</h5>
        <p>在
          <code>config</code> 目录下新建文件
          <code>proxy.js</code>，添加 http-proxy-middleware 远程API接口</p>

        <pre class="border rounded bg-light">

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
        </pre>

        <p>修改
          <code>config</code> 目录中的
          <code>index.js</code> 配置：proxyTable，并把 autoOpenBrowser 置为 true</p>

        <pre class="border rounded bg-light">

          const proxy = require('./proxy')

          ...
          
          dev: {
            ...
            proxyTable: proxy,
            autoOpenBrowser: true,
            ...
          }
        </pre>

        <h5 class="font-weight-bold"
            id="anchor3">3、配置 vue-router</h5>
        <p>更改
          <code>router</code> 目录下的
          <code>index.js</code> 文件，加上勾子函数及路由配置</p>
        <pre class="border rounded bg-light">

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
        </pre>

        <p>
          <code>before-each-hooks.js</code>中处理页面title和权限验证</p>

        <pre class="border rounded bg-light">

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
        </pre>

        <p>然后在
          <code>routes</code>中为需要权限验证的路由添加
          <code>meta</code>元信息</p>
        <pre class="border rounded bg-light">
          path: '/admin',
          component: r => require.ensure([], () => r(require('@/views/Admin')), 'app-admin'),
          meta: {
            requiresAuth: true,
            // 根据业务设置权限信息
            authorization: 'org_corp,org_admin'
          }
        </pre>

        <h5 class="font-weight-bold"
            id="anchor4">4、配置 vuex</h5>
        <div>（1）安装 vuex</div>
        <p>
          <code>npm install -S vuex</code>
        </p>
        <p>（2）在
          <code>src</code>目录下新建
          <code>store</code>目录，在其中新建
          <code>modules</code>目录和
          <code>index.js</code>文件</p>
        <pre class="border rounded bg-light">

          // 获取 ./modules 目录下所有文件，作为 vuex 的一个模块
          const files = require.context('./modules/', true, /\.js$/)
          ...

          export default new Vuex.Store({
            modules: modules,
            strict: process.env.NODE_ENV !== 'production'
          })
        </pre>
        <p>
          <code>modules</code>目录中的文件格式参考 vuex 官网：</p>
        <pre class="border rounded bg-light">

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
        </pre>
        <p>（3）在主文件
          <code>main.js</code>中引入：</p>
        <pre class="border rounded bg-light">

          import store from './store'

          new Vue({
            ...
            store,
            ...
          })
        </pre>

        <h5 class="font-weight-bold"
            id="anchor5">5、引入 axios</h5>
        <div>（1）安装 axios</div>
        <p>
          <code>npm install -S axios vue-axios</code>
        </p>
        <div>（2）在
          <code>src</code>下新建
          <code>api</code>目录，并新建 axios.js 文件</div>
        <pre class="border rounded bg-light">

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
        </pre>
        <div>（3）在主文件
          <code>main.js</code>中引入：</div>
        <pre class="border rounded bg-light">

          import VueAxios from 'vue-axios'
          import axios from './api/axios'

          // 组件中使用 this.$http 调用 axios
          Vue.use(VueAxios, axios)
        </pre>
        <p>若统一管理API接口，可将接口配置全放于
          <code>api</code>目录，使用时按需导入</p>

        <h5 class="font-weight-bold"
            id="anchor6">6、配置全局工具函数 utils</h5>
        <div>（1）在
          <code>src</code>中新建
          <code>utils</code>目录，并新建
          <code>index.js</code>文件：</div>
        <pre class="border rounded bg-light">
          
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
        </pre>
        <div>（2）在
          <code>main.js</code>中引入，在组件中就可以用 this.$utils 调用了</div>
        <pre class="border rounded bg-light">

          import utils from './utils'

          Vue.use(utils)
        </pre>

        <h5 class="font-weight-bold"
            id="anchor7">7、全局引入 element-ui（也可以不在这里引入，在组件按需引入）</h5>
        <pre class="border rounded bg-light">

          import ElementUI from 'element-ui'

          Vue.use(ElementUI)
        </pre>

        <h5 class="font-weight-bold"
            id="anchor8">8、引入样式及字体图标</h5>
        <p>项目采用 scss 作为默认的样式预处理器，并引入
          <code>bootstrap 4</code>
          <code>font-awesome</code>
          <code>element-ui</code>样式，在
          <code>assets</code>中新建
          <code>scss</code>目录，新按 scss 样式构建样式文件：
        </p>
        <div>（1）安装插件</div>
        <p>
          <code>npm install -S bootstrap@4.0.0-beta.2 font-awesome</code>
        </p>
        <div>（2）新建
          <code>_variables.scss</code>，设置样式的全局变量，可覆盖
          <code>bootstarp</code>
          <code>element-ui</code>变量</div>
        <pre class="border rounded bg-light">

          $primary:           #57b231;

          $body-bg:           #f9f9f9;
          $font-family-base:  Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif !default;            
        </pre>
        <div>（3）新建
          <code>index.scss</code>并引入样式</div>
        <pre class="border rounded bg-light">

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
        </pre>
        <p>（4）在
          <code>main.js</code>中引入
          <code>import '@/assets/scss/index.scss'</code>，组件中的样式写在
          <code>style</code>标签中，并加上
          <code>scoped</code> 属性</p>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {

    },

    props: {

    },

    data() {
      return {

      }
    },

    computed: {

    },

    watch: {

    },

    created() {

    },

    mounted() {

    },

    methods: {

    }
  }
</script>

<style scoped>


</style>
