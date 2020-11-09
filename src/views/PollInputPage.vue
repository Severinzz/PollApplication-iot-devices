<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-form ref="form">
            <template>
              <v-container
                class="px-0"
                fluid>

                <v-radio-group v-model="radioGroup">
                  <v-radio
                    :label="'Display device'"
                    :value="'display'">
                  </v-radio>
                  <v-radio
                    :label="'Voting device'"
                    :value="'voting'">
                  </v-radio>
                </v-radio-group>

              </v-container>
            </template>
            <v-row
              align="center"
              justify="center">
              <v-text-field
                v-model="pollIdInput"
                label="Poll Id"
                placeholder="e.g: 12345678"
                :rules="rules"
                clearable
                required/>
            </v-row>
            <v-row
              align="center"
              justify="center">
              <v-btn
                @click="sendPollId"
                color="primary"
                large>
                Ok
              </v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PollInputPage',
  data () {
    return {
      pollIdInput: '',
      radioGroup: 'display',
      rules: [
        v => /^\d+$/.test(v) || 'Only numbers in this field!', // If not included the number field can contain + and -
        v => (v < 10000000 && v > 999999) || 'Length should be 7 digits'
      ]
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
      if (this.$refs.form.validate()) {
        const pollId = this.pollIdInput
        const deviceId = this.deviceId
        this.setPollId(this.pollIdInput)
        if (this.radioGroup === 'display') {
          this.$router.replace({
            name: 'Result',
            params: {
              deviceId: deviceId,
              pollId: pollId
            }
          })
        } else {
          this.$router.replace({
            name: 'Vote',
            params: {
              deviceId: deviceId,
              pollId: pollId
            }
          })
        }
      }
    }
  }
}
</script>
