<template>
  <div class="results">
    <div v-if="!error">
      <h1>
        Poll {{ pollId }}
      </h1>
      <div class="voteContainer">
        <h1>
          Yes: {{ yesVotes }}
        </h1>
        <h1>
          No: {{ noVotes }}
        </h1>
      </div>
    </div>

    <div v-if="error">
      <v-alert
        elevation="15"
        type="error">
        {{ error }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WEBSOCKET_API from '../common/websocket'

export default {
  name: 'Result',
  data () {
    return {
      intervalId: 0
    }
  },
  methods: {
    ...mapActions([
      'getVotes',
      'subscribeToPoll'
    ])
  },
  computed: {
    ...mapState({
      pollId: state => state.pollId,
      yesVotes: state => state.yesVotes,
      noVotes: state => state.noVotes,
      error: state => state.errorMessage
    })
  },
  created () {
    this.subscribeToPoll()
  },
  destroyed () {
    WEBSOCKET_API.close()
    this.$store.commit('clearError')
    this.$store.commit('resetVotes')
  }
}
</script>

<style scoped>
  .voteContainer {
    margin-top: 2em;
  }
  .results{
    text-align: center;
  }
</style>
