import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var modules = {}
const files = require.context('./modules/', true, /\.js$/)
files.keys().forEach(key => {
  var k = key.replace(/\.\/(\S+)\.js$/, '$1')
  modules[k] = files(key).default
})

export default new Vuex.Store({
  modules: modules,
  strict: process.env.NODE_ENV !== 'production'
})
