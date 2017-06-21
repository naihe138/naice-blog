import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeType: 'home',
    articles: [],  // 文章列表
    accounts: [], // 微信公众号列表
    category: [], // 公众号分类列表
  }
})

export default store
