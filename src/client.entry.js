/* eslint-disable no-underscore-dangle, consistent-return, array-callback-return */
import 'es6-promise/auto'
import Vue from 'vue'
import { app, store, router } from './app'

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const activated = matched.filter((component, i) => diffed ||
    (diffed = (prevMatched[i] !== component)))

    const asyncDataHooks = activated.map(component => component.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    // Promise.all(activated.map((component) => {
    //   if (component.asyncData) {
    //     return component.asyncData({ store, route: to })
    //   }
    // }))
    // .then(() => next())
    // .catch(next)
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
    .then(() => next())
    .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
if (location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
