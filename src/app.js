/* eslint-disable import/first */
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import store from './store'
import router from './router'
import titleMixin from './utils/title'

// mixin for handling title
Vue.mixin(titleMixin)

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)


// create the app instance.
// here we inject the router and store to all child components,
const app = new Vue({
  router,
  store,
  render: h => h(App)
})
// making them available everywhere as `this.$router` and `this.$store`.

// different depending on whether we are in a browser or on the server.
export { app, router, store }
