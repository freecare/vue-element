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

  Vue.prototype.$utils = utils
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
