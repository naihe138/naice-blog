import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _06cdab04 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _521fdc4e = () => interopDefault(import('../pages/allarticle.vue' /* webpackChunkName: "pages/allarticle" */))
const _463de620 = () => interopDefault(import('../pages/article/index.vue' /* webpackChunkName: "pages/article/index" */))
const _33cdab5a = () => interopDefault(import('../pages/hero.vue' /* webpackChunkName: "pages/hero" */))
const _6de8699c = () => interopDefault(import('../pages/music.vue' /* webpackChunkName: "pages/music" */))
const _5216d0d0 = () => interopDefault(import('../pages/project.vue' /* webpackChunkName: "pages/project" */))
const _fba4e950 = () => interopDefault(import('../pages/article/_id.vue' /* webpackChunkName: "pages/article/_id" */))
const _268585c9 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _06cdab04,
    name: "about"
  }, {
    path: "/allarticle",
    component: _521fdc4e,
    name: "allarticle"
  }, {
    path: "/article",
    component: _463de620,
    name: "article"
  }, {
    path: "/hero",
    component: _33cdab5a,
    name: "hero"
  }, {
    path: "/music",
    component: _6de8699c,
    name: "music"
  }, {
    path: "/project",
    component: _5216d0d0,
    name: "project"
  }, {
    path: "/article/:id",
    component: _fba4e950,
    name: "article-id"
  }, {
    path: "/",
    component: _268585c9,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
