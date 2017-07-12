// state
const state = {
  added: []
}

// getters
const getters = {
  ret: state => state.added
}

// actions
const actions = {
  add ({ commit, state }, products) {
    commit('add', products)
  }
}

// mutations
const mutations = {
  add (state, item) {
    console.log(state.added)
    state.added.push(item)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
