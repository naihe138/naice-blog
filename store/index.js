import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article'
import project from './modules/project'
import hero from './modules/hero'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    scrollTop: 0,
    footerFixed: false,
    averterNum: 0
  },
  modules: {
    article,
    project,
    hero
  },
  mutations: {
    changeScroll (state, num) {
      state.scrollTop = num
    },
    changeFooterFixed (state, isb) {
      state.footerFixed = isb
    },
    changeAverter (state, num) {
      state.averterNum = num
    }
  }
})

export default store