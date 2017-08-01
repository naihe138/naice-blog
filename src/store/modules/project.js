/**
 * @file
 * @author 何文林
 * @date 2017/8/1
 */
import * as types from '../mutation-types'
import server from '../../config/server'
import axios from '../../utils/axios'

// state
const state = {
  project: [],
  effectClass: ['effect-lily', 'effect-sadie', 'effect-layla', 'effect-oscar', 'effect-marley', 'effect-ruby', 'effect-roxy', 'effect-bubba', 'effect-romeo', 'effect-dexter', 'effect-sarah', 'effect-chico', 'effect-milo']
}

// getters
const getters = {
  project: state => state.project
}

// actions
const actions = {
  // 获取文章列表
  async [types.GET_PROJECT] ({commit}, prams = {}) {
    let project = await axios.get(server.getProject, prams)
    if (project) {
      for (var i = 0; i < project.list.length; i++) {
        let mun = Math.ceil(Math.random() * state.effectClass.length)
        project.list[i].effect = state.effectClass[mun]
      }
      commit(types.GET_PROJECT, project.list)
    } else {
      alert('请求出错')
    }
  }
}

// mutations
const mutations = {
  [types.GET_PROJECT] (state, data) {
    state.project = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
