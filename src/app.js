/* eslint-disable import/first */
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import store from './store'
import router from './router'
import titleMixin from './utils/title'

// mixin 处理标题
Vue.mixin(titleMixin)

// 同步加载路router由和 store
// this registers `store.state.route`
sync(store, router)

const app = new Vue({
  router,
  store,
  render: h => h(App)
})
export { app, router, store }
