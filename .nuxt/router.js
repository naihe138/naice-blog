import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _4a61e30d = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _6c6b7c36 = () => interopDefault(import('../pages/allarticle.vue' /* webpackChunkName: "pages/allarticle" */))
const _7b252bf9 = () => interopDefault(import('../pages/article/index.vue' /* webpackChunkName: "pages/article/index" */))
const _1eed65ac = () => interopDefault(import('../pages/hero.vue' /* webpackChunkName: "pages/hero" */))
const _9d06bcb6 = () => interopDefault(import('../pages/music.vue' /* webpackChunkName: "pages/music" */))
const _017d2a99 = () => interopDefault(import('../pages/project.vue' /* webpackChunkName: "pages/project" */))
const _00604ebe = () => interopDefault(import('../pages/article/_id.vue' /* webpackChunkName: "pages/article/_id" */))
const _6a19bdd2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
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
      component: _4a61e30d,
      name: "about"
    }, {
      path: "/allarticle",
      component: _6c6b7c36,
      name: "allarticle"
    }, {
      path: "/article",
      component: _7b252bf9,
      name: "article"
    }, {
      path: "/hero",
      component: _1eed65ac,
      name: "hero"
    }, {
      path: "/music",
      component: _9d06bcb6,
      name: "music"
    }, {
      path: "/project",
      component: _017d2a99,
      name: "project"
    }, {
      path: "/article/:id",
      component: _00604ebe,
      name: "article-id"
    }, {
      path: "/",
      component: _6a19bdd2,
      name: "index"
    }],

    fallback: false
  })
}
