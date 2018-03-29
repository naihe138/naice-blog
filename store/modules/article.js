
export default {
	state: {
		data: [],
		hotData: [],
		selectArticle: {
			meta: {}
		}
	},
	mutations: {
		getArticle (state, data) {
			state.data = data || []
		},
		getHotArticle (state, data) {
			state.hotData = data || []
		},
		selectArticle (state, data) {
			state.selectArticle = data || {}
		}
	}
}
