import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'LogInPage',
    props: true,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/menu-form',
    name: 'BuildMenuForm',
    props: true,
    component: () => import('../views/BuildMenu.vue')
  },
  {
    path: '/cards',
    name: 'CardsPage',
    props: true,
    component: () => import('../views/Cards.vue')
  },
  {
    path: '/mpc',
    name: 'MPCPage',
    props: true,
    component: () => import('../views/MPC.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
