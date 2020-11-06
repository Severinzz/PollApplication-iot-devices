<template>
  <div class="about">
    <h1>
      Poll {{ PollId }}
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
import { mapState } from 'vuex'

export default {
  name: 'Result',
  methods: {
    send () {
    }
  },
  computed: {
    ...mapState({
      pollId: state => state.pollId,
      yesVotes: state => state.yesVotes,
      noVotes: state => state.noVotes
    })
  }
}
</script>

<style scoped>
  .voteContainer{
    margin-top: 2em;
  }
</style>
