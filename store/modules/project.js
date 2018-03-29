
export default {
	state: {
		data: []
	},
	mutations: {
		getProject (state, data) {
			state.data = data || []
		}
	}
}
