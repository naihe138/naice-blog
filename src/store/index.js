import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
// test
import addArr from './modules/count'
// articel
import articles from './modules/articles'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters,
  modules: {
    addArr,
    articles
  }
})
