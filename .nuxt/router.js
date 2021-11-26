import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _628be2fe = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _466f9594 = () => interopDefault(import('../pages/contact/index.vue' /* webpackChunkName: "pages/contact/index" */))
const _67620564 = () => interopDefault(import('../pages/donate.vue' /* webpackChunkName: "pages/donate" */))
const _653f49bc = () => interopDefault(import('../pages/faqs.vue' /* webpackChunkName: "pages/faqs" */))
const _66ad4718 = () => interopDefault(import('../pages/newsletter.vue' /* webpackChunkName: "pages/newsletter" */))
const _024bd6ae = () => interopDefault(import('../pages/thelatest.vue' /* webpackChunkName: "pages/thelatest" */))
const _79563e26 = () => interopDefault(import('../pages/theproblem.vue' /* webpackChunkName: "pages/theproblem" */))
const _0c2889c5 = () => interopDefault(import('../pages/contact/success.vue' /* webpackChunkName: "pages/contact/success" */))
const _143f5c4e = () => interopDefault(import('../pages/page/_id.vue' /* webpackChunkName: "pages/page/_id" */))
const _fb78847a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _628be2fe,
    name: "about"
  }, {
    path: "/contact",
    component: _466f9594,
    name: "contact"
  }, {
    path: "/donate",
    component: _67620564,
    name: "donate"
  }, {
    path: "/faqs",
    component: _653f49bc,
    name: "faqs"
  }, {
    path: "/newsletter",
    component: _66ad4718,
    name: "newsletter"
  }, {
    path: "/thelatest",
    component: _024bd6ae,
    name: "thelatest"
  }, {
    path: "/theproblem",
    component: _79563e26,
    name: "theproblem"
  }, {
    path: "/contact/success",
    component: _0c2889c5,
    name: "contact-success"
  }, {
    path: "/page/:id?",
    component: _143f5c4e,
    name: "page-id"
  }, {
    path: "/",
    component: _fb78847a,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
