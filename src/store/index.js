import Vue from 'vue'
import Vuex from 'vuex'
import { API_SERVICE } from '../common/api'
import WEBSOCKET_SERVICE from '../common/websocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pollId: 0,
    yesVotes: 0,
    noVotes: 0,
    deviceId: 0,
    sentYes: 0,
    sentNo: 0
  },
  mutations: {
    increment (state, toIncrement) {
      state[toIncrement]++
    },
    resetVotes (state) {
      state.yesVotes = 0
      state.noVotes = 0
    },
    setPollId (state, pollId) {
      state.pollId = pollId
    },
    setDeviceId (state, deviceId) {
      state.deviceId = deviceId
    },
    setResult (state, result) {
      state.yesVotes = result.yes
      state.noVotes = result.no
    },
    increaseSentYes (state, sentYes) {
      state.sentYes = state.sentYes + sentYes
    },
    increaseSentNo (state, sentNo) {
      state.sentNo = state.sentNo + sentNo
    }
  },
  actions: {
    increment ({ commit }, toIncrement) {
      commit('increment', toIncrement)
    },
    resetVotes ({ commit }) {
      commit('resetVotes')
    },
    // TODO: CHECK IF ID EXISTS
    setDeviceId ({ commit }, deviceId) {
      commit('setDeviceId', deviceId)
    },
    setPollId ({ commit }, pollId) {
      commit('setPollId', pollId)
    },
    sendVotes ({ commit }, voteObject) {
      console.log(voteObject)
      API_SERVICE.post('voting-device/' + this.state.pollId, voteObject).then(res => {
        console.log(res)
        commit('increaseSentYes', voteObject.numberOfYes)
        commit('increaseSentNo', voteObject.numberOfNo)
        commit('resetVotes')
      }).catch(err => {
        console.log(err)
      })
    },
    getVotes ({ commit }) {
      API_SERVICE.get('polls/' + this.state.pollId + '/votes').then(res => {
        console.log(res)
        commit('setResult', res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    subscribeToPoll ({ commit }) {
      const callback = (res) => {
        const votes = JSON.parse(res.body)
        commit('setResult', votes)
      }
      const path = 'poll/' + this.state.pollId + '/votes'
      const deviceId = this.state.deviceId
      WEBSOCKET_SERVICE.connect(path, callback, deviceId)
    }
  },
  modules: {
  }
})
