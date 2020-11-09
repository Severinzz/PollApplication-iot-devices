import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Vote from '../views/Vote.vue'
import PollInputPage from '../views/PollInputPage.vue'
import NoMatch from '../views/NoMatch.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: 'device/:deviceId/poll/:pollId/result',
    name: 'Result',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Result.vue')
  },
  {
    path: 'device/:deviceId/poll/:pollId/vote',
    name: 'Vote',
    component: Vote
  },
  {
    path: '/PollInputPage/device/:id',
    name: 'PollInputPage',
    component: PollInputPage
  },
  {
    path: '*',
    name: 'NoMatch',
    component: NoMatch
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
