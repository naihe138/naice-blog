import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _75f904fc = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _5dbfe890 = () => interopDefault(import('../pages/allarticle.vue' /* webpackChunkName: "pages/allarticle" */))
const _9a58fd24 = () => interopDefault(import('../pages/article/index.vue' /* webpackChunkName: "pages/article/index" */))
const _067fdfd6 = () => interopDefault(import('../pages/hero.vue' /* webpackChunkName: "pages/hero" */))
const _5a21fbce = () => interopDefault(import('../pages/project.vue' /* webpackChunkName: "pages/project" */))
const _2ae1f154 = () => interopDefault(import('../pages/article/_id.vue' /* webpackChunkName: "pages/article/_id" */))
const _36894f72 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

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
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
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

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/about",
      component: _75f904fc,
      name: "about"
    }, {
      path: "/allarticle",
      component: _5dbfe890,
      name: "allarticle"
    }, {
      path: "/article",
      component: _9a58fd24,
      name: "article"
    }, {
      path: "/hero",
      component: _067fdfd6,
      name: "hero"
    }, {
      path: "/project",
      component: _5a21fbce,
      name: "project"
    }, {
      path: "/article/:id",
      component: _2ae1f154,
      name: "article-id"
    }, {
      path: "/",
      component: _36894f72,
      name: "index"
    }],

    fallback: false
  })
}
