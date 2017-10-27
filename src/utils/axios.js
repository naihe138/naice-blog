import axios from 'axios'
import store from '../store'
axios.interceptors.request.use(config => {
  store.dispatch('progress', 50)
  return config
}, error => {
  return Promise.reject(error)
})

function checkStatus(response) {
  store.dispatch('progress', 100)
  if (response.status === 200 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: -404,
      message: response.statusText,
      data: ''
    }
  }
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      url,
      data,
      timeout: 2000,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(checkStatus).then(data => data.data).catch(err => {
      // location.href = '/'
      return err
    })
  },
  get(url, params) {
    return axios({
      method: 'get',
      url,
      params: params || {},
      timeout: 2000,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(checkStatus).then(data => data.data).catch(err => {
      // location.href = '/'
      return err
    })
  }
}
