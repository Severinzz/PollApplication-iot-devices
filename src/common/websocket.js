import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import config from './config'

let socket = {}
let client = {}
let initialized = false

const WEBSOCKET = {
  connect (path, callback, deviceId) {
    if (initialized === false) {
      init()
    }
    const headers = this.setupHeader(deviceId)
    client.connect(headers, function (frame) {
      console.log(client.headers)
      client.subscribe('/topic/' + path, callback)
      client.send('/app/' + path, headers)
    })
  },

  close () {
    if (typeof socket.close === 'function') {
      socket.close()
      initialized = false
    }
  },

  setupHeader (deviceId) {
    return {
      deviceId: deviceId
    }
  }
}

function init () {
  socket = SockJS(config.API_URL + '/ws')
  client = Stomp.over(socket)
  initialized = false
}

export default WEBSOCKET
