
import axios from 'axios'

axios.interceptors.response.use((response) => {
	// Do something with response data
	return response.data ? response.data : {};
}, function (error) {
	// Do something with response error
	return Promise.reject(error);
})

export default axios