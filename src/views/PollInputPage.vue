<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <template>
            <v-container
              class="px-0"
              fluid
            >
              <v-radio-group v-model="radioGroup">
                <v-radio
                  :label="'Display device'"
                  :value="'display'"
                ></v-radio>
                <v-radio
                  :label="'Voting device'"
                  :value="'voting'"
                ></v-radio>
              </v-radio-group>
            </v-container>
          </template>
          <v-row
            align="center"
            justify="center"
          >
            <v-text-field
              v-model="pollIdInput"
              label="Poll Id"
              placeholder="e.g: 12345678"
              clearable
              required
            />
            <v-btn @click="sendPollId">
              Ok
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PollInputPage',
  data () {
    return {
      pollIdInput: '1679667',
      radioGroup: 'voting'
    }
  },
  computed: {
    ...mapState({
      deviceId: state => state.deviceId
    })
  },
  methods: {
    ...mapActions([
      'setPollId'
    ]),
    sendPollId () {
      const pollId = this.pollIdInput
      const deviceId = this.deviceId
      this.setPollId(this.pollIdInput)
      if (this.radioGroup === 'display') {
        this.$router.replace({ name: 'Result', params: { deviceId: deviceId, pollId: pollId } })
      } else {
        this.$router.replace({ name: 'Vote', params: { deviceId: deviceId, pollId: pollId } })
      }
      // this.setDeviceId(this.deviceIdInput)
      // this.$router.push()
    }
  }
}
</script>
