<template>
  <div class="container">
    <div v-if="error">
      <v-alert
        elevation="15"
        type="error">
        {{ error }}
      </v-alert>
    </div>

    <div v-if="!error">
      <div>
        <h2>
          Yes votes sent: {{sentYes}}
        </h2>
        <h2>
          No votes sent: {{sentNo}}
        </h2>
      </div>

      <div class="btnContainer">
        <v-btn
          x-large
          color="green"
          @click="vote('yesVotes')">
          Yes: {{ yesVotes }}
        </v-btn>
        <v-btn
          x-large
          color="red"
          @click="vote('noVotes')">
          No: {{ noVotes }}
        </v-btn>

        <div class="btnContainer">
        <v-btn
          :disabled="yesVotes < 1 && noVotes < 1"
          @click="submit">
          Send
        </v-btn>
        <v-btn
          :disabled="yesVotes < 1 && noVotes < 1"
          @click="this.resetVotes">
          Reset
        </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Vote',
  computed: {
    ...mapState({
      yesVotes: state => state.yesVotes,
      noVotes: state => state.noVotes,
      deviceId: state => state.deviceId,
      sentYes: state => state.sentYes,
      sentNo: state => state.sentNo,
      error: state => state.errorMessage
    })
  },
  methods: {
    ...mapActions([
      'increment',
      'resetVotes',
      'sendVotes'
    ]),
    vote (toIncrement) {
      this.increment(toIncrement)
    },
    submit () {
      const job = {
        id: this.deviceId,
        numberOfYes: this.yesVotes,
        numberOfNo: this.noVotes
      }
      this.sendVotes(job)
    }
  },
  destroyed () {
    this.$store.commit('resetVotes')
    this.$store.commit('clearSentVotes')
    this.$store.commit('clearError')
  }
}
</script>

<style scoped>
  .container{
    text-align: center;
  }
  .btnContainer{
    margin-top: 5vh;
  }
</style>
