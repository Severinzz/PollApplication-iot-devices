<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row
            align="center"
            justify="center"
          >
            <v-text-field
              v-model="deviceIdInput"
              label="Device Id"
              placeholder="e.g: 6e7c8ece-e7ac-4295-bbf8-50d36f2d83cc"
              clearable
              required
            />
            <v-btn @click="sendDeviceId">
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
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      deviceIdInput: '6e7c8ece-e7ac-4295-bbf8-50d36f2d83cc'
    }
  },
  methods: {
    ...mapActions([
      'setDeviceId'
    ]),
    sendDeviceId () {
      const deviceIdInput = this.deviceIdInput
      this.setDeviceId(deviceIdInput)
      this.$router.push({ name: 'PollInputPage', params: { id: deviceIdInput } })
    }
  }
}
</script>
