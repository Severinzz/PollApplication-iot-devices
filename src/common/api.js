import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL, TIME_OUT } from '@/common/config'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = API_URL
Vue.axios.defaults.timeout = TIME_OUT

/*
 Adapted from gothinkers/vue-realworld-example-app repository
 Source: https://github.com/gothinkster/vue-realworld-example-app/blob/master/src/common/api.service.js
 Structure and some general methods are approximately the same as in the "real world" example.
 */
export const API_SERVICE = {
  delete (path, slug = '') {
    return axios.delete(`${path}/${slug}`)
  },
  get (path, slug = '') {
    return axios.get(`${path}/${slug}`)
  },
  getWithParam (path, params) {
    return axios.get(`${path}`, params)
  },
  post (path, params) {
    return axios.post(`${path}`, params)
  }
}
