import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
// test
import addArr from './modules/count'
// articel
import articles from './modules/articles'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    progress: 0
  },
  getters,
  actions,
  mutations: {
    progress (state, payload) {
      state.progress = payload
    }
  },
  modules: {
    addArr,
    articles
  }
})
