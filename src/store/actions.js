export const progress = ({ commit }, playload) => {
  commit('progress', playload)
}

export const currunPage = ({ commit }, page) => {
  commit('setPage', page)
}
