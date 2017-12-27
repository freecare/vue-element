// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import axios from './api/axios'

import utils from './utils'

import ElementUI from 'element-ui'

// IE9+支持
import 'babel-polyfill'

// 全局css
import '@/assets/scss/index.scss'

// 组件中使用 this.$http 调用 axios
Vue.use(VueAxios, axios)

// 组件中使用 this.$utils 调用全局方法
Vue.use(utils)

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
