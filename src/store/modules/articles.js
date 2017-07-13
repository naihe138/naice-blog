import * as types from '../mutation-types'
import server from '../../config/server'
import axios from '../../utils/axios'

// state
const state = {
  articles: [],
  count: 0,
  oneArticle: {}
}

// getters
const getters = {
  articles: state => state.articles,
  count: state => state.count,
  oneArticle: state => state.oneArticle
}

// actions
const actions = {
  add ({ commit, state }, products) {
    commit('add', products)
  },
  // 获取文章列表
  async [types.GET_ARTICLE] ({commit}, prams = {}) {
    const articels = await axios.get(server.getArticles, prams)
    if (articels.aticles) {
      commit(types.GET_ARTICLE, articels.aticles)
      commit(types.GET_COUNT, articels.count)
    } else {
      alert('请求出错')
    }
  },
  // 获取标签文章列表
  async [types.GET_TAGS] ({commit}, prams = {}) {
    const articels = await axios.get(server.tag, prams)
    console.log(articels)
    if (articels.aticles) {
      commit(types.GET_TAGS, articels.aticles)
      commit(types.GET_COUNT, articels.count)
    } else {
      alert('请求出错')
    }
  },
  // 获取某一篇
  async [types.GET_ARTICLEBYID] ({commit}, id) {
    let data = {}
    if (state.articles && state.articles.length > 0) {
      data = state.articles.filter(item => item.id === id)
      data = data[0]
      commit(types.GET_ARTICLEBYID, data)
    } else {
      let article = await axios.get(server.getArticles + '/' + id)
      if (article.status) {
        commit(types.GET_ARTICLEBYID, article.data)
      } else {
        alert('请求出错啦')
      }
    }
  },
  async [types.ADD_COMMENT] ({commit}, id) {
    console.log(123)
  }
}

// mutations
const mutations = {
  [types.GET_ARTICLE] (state, data) {
    state.articles = data
  },
  [types.GET_TAGS] (state, data) {
    state.articles = data
  },
  [types.GET_ARTICLEBYID] (state, data) {
    state.oneArticle = data
  },
  [types.GET_COUNT] (state, n) {
    state.count = n
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
