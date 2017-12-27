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
