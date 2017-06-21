/* eslint-disable consistent-return, array-callback-return */
import { app, router, store } from './app'

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => new Promise((resolve, reject) => {
  const s = isDev && Date.now()
  const { url } = context
  const fullPath = router.resolve(url).route.fullPath

  if (url !== fullPath) {
    reject({ url: fullPath })
  }

    // set router's location
  router.push(url)

    // wait until router has resolved possible async hooks
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents()
      // no matched routes
    if (!matchedComponents.length) {
      reject({ code: 404 })
    }
    Promise.all(matchedComponents.map((component) => {
      if (component.asyncData) {
        return component.asyncData({
          store,
          route: router.currentRoute
        })
      }
    })).then(() => {
      if (isDev) {
        console.log(`data pre-fetch: ${Date.now() - s}ms`)
      }
      context.state = store.state
      resolve(app)
    }).catch(reject)
  }, reject)
})
