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
  methods: {
    ...mapActions[{

    }]
  },
  computed: {
    ...mapState({
      pollId: state => state.pollId,
      yesVotes: state => state.yesVotes,
      noVotes: state => state.noVotes
    })
  },
  created () {

  }
}
</script>

<style scoped>
  .voteContainer{
    margin-top: 2em;
  }
</style>
