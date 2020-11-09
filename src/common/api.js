import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL, TIME_OUT } from '@/common/config'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = API_URL
Vue.axios.defaults.timeout = TIME_OUT

export const API_SERVICE = {
  get (path, slug = '') {
    return axios.get(`${path}/${slug}`)
  },
  post (path, params) {
    return axios.post(`${path}`, params)
  }
}
