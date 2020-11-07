<template>
  <div class="about">
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
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'

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
      noVotes: state => state.noVotes
    })
  },
  created () {
    // this.intervalId = setInterval(this.getVotes, 1000)
    this.subscribeToPoll()
  },
  destroyed () {
    clearInterval(this.intervalId)
  }
}
</script>

<style scoped>
  .voteContainer{
    margin-top: 2em;
  }
</style>
