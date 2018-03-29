import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _d958fda6 = () => import('../pages/project.vue' /* webpackChunkName: "pages/project" */).then(m => m.default || m)
const _72909f16 = () => import('../pages/hero.vue' /* webpackChunkName: "pages/hero" */).then(m => m.default || m)
const _0944cea1 = () => import('../pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _078f72d1 = () => import('../pages/allarticle.vue' /* webpackChunkName: "pages/allarticle" */).then(m => m.default || m)
const _7d0578e6 = () => import('../pages/article/index.vue' /* webpackChunkName: "pages/article/index" */).then(m => m.default || m)
const _7ab0c535 = () => import('../pages/article/_id.vue' /* webpackChunkName: "pages/article/_id" */).then(m => m.default || m)
const _28fca966 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/project",
			component: _d958fda6,
			name: "project"
		},
		{
			path: "/hero",
			component: _72909f16,
			name: "hero"
		},
		{
			path: "/about",
			component: _0944cea1,
			name: "about"
		},
		{
			path: "/allarticle",
			component: _078f72d1,
			name: "allarticle"
		},
		{
			path: "/article",
			component: _7d0578e6,
			name: "article"
		},
		{
			path: "/article/:id",
			component: _7ab0c535,
			name: "article-id"
		},
		{
			path: "/",
			component: _28fca966,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
