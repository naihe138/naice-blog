import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _70fb4839 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _7f5d3839 = () => interopDefault(import('../pages/allarticle.vue' /* webpackChunkName: "pages/allarticle" */))
const _744ca525 = () => interopDefault(import('../pages/article/index.vue' /* webpackChunkName: "pages/article/index" */))
const _33d8927e = () => interopDefault(import('../pages/hero.vue' /* webpackChunkName: "pages/hero" */))
const _4fd3f25e = () => interopDefault(import('../pages/music.vue' /* webpackChunkName: "pages/music" */))
const _315c1676 = () => interopDefault(import('../pages/project.vue' /* webpackChunkName: "pages/project" */))
const _06c8a666 = () => interopDefault(import('../pages/article/_id.vue' /* webpackChunkName: "pages/article/_id" */))
const _de99ba04 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/about",
      component: _70fb4839,
      name: "about"
    }, {
      path: "/allarticle",
      component: _7f5d3839,
      name: "allarticle"
    }, {
      path: "/article",
      component: _744ca525,
      name: "article"
    }, {
      path: "/hero",
      component: _33d8927e,
      name: "hero"
    }, {
      path: "/music",
      component: _4fd3f25e,
      name: "music"
    }, {
      path: "/project",
      component: _315c1676,
      name: "project"
    }, {
      path: "/article/:id",
      component: _06c8a666,
      name: "article-id"
    }, {
      path: "/",
      component: _de99ba04,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
