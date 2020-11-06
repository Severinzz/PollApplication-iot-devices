<template>
  <div>
    <div>
      <h2>
        Yes votes sent: {{sentYes}}
      </h2>
      <h2>
        No votes sent: {{sentNo}}
      </h2>
    </div>
    <div>
      <v-btn @click="vote('yesVotes')">Yes: {{ yesVotes }}</v-btn>
      <v-btn @click="vote('noVotes')">No: {{ noVotes }}</v-btn>
      <v-btn @click="submit">Send</v-btn>
      <v-btn @click="this.resetVotes">Reset</v-btn>
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
      sentNo: state => state.sentNo
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
  }
}
</script>

<style scoped>

</style>
