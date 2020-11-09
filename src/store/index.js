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
    sentNo: 0,
    errorMessage: ''
  },
  mutations: {
    increment (state, toIncrement) {
      state[toIncrement]++
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
    },
    setError (state, error) {
      state.errorMessage = error
    },
    clearError (state) {
      state.errorMessage = ''
    },
    resetVotes (state) {
      state.yesVotes = 0
      state.noVotes = 0
    },
    clearSentVotes (state) {
      state.sentYes = 0
      state.sentNo = 0
    }
  },
  actions: {
    increment ({ commit }, toIncrement) {
      commit('increment', toIncrement)
    },
    resetVotes ({ commit }) {
      commit('resetVotes')
    },
    setDeviceId ({ commit }, deviceId) {
      commit('setDeviceId', deviceId)
    },
    setPollId ({ commit }, pollId) {
      commit('setPollId', pollId)
    },
    sendVotes ({ commit }, voteObject) {
      API_SERVICE.post('voting-device/' + this.state.pollId, voteObject).then(res => {
        console.log(res)
        commit('increaseSentYes', voteObject.numberOfYes)
        commit('increaseSentNo', voteObject.numberOfNo)
        commit('resetVotes')
      }).catch(err => {
        let error = ''
        if (!err.response.data.includes('exception')) {
          error = err.response.data.includes('Device') ? err.response.data + '. Device ID' + this.state.deviceId
            : err.response.data + '. Poll ID' + this.state.pollId
        } else {
          error = 'Error 500 Internal server error. Please check device and poll id'
        }
        commit('setError', error)
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
      const connectionErrorCallBack = (error) => {
        if (error.headers) {
          const errorMessage = error.headers.message.includes('NotAllowedDevice') ? 'This device is not allowed on ' +
            'this poll'
            : error.headers.message ||
            error.headers.message.includes('PollNotFound') ? 'Poll: ' + this.state.pollId + ' was not found'
              : error.headers.message
          commit('setError', errorMessage)
        }
      }
      const path = 'poll/' + this.state.pollId + '/votes'
      const deviceId = this.state.deviceId
      WEBSOCKET_SERVICE.connect(path, callback, deviceId, this.state.pollId, connectionErrorCallBack)
    }
  },
  modules: {
  }
})
