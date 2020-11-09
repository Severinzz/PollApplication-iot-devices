<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-form ref="form">
            <v-row
              align="center"
              justify="center"
            >
              <v-text-field
                v-model="deviceIdInput"
                label="Device Id"
                placeholder="e.g:  6e7c8ece-e7ac-4295-bbf8-50d36f2d83cc"
                :rules="rules"
                clearable
                required
              />
            </v-row>
            <v-row
              align="center"
              justify="center"
            >
              <v-btn
                @click="sendDeviceId"
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
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      deviceIdInput: '',
      rules: [
        value => !!value || 'Required.',
        value => (value || '').length >= 36 || 'Min 36 characters',
        value => (value || '').length <= 36 || 'Max 36 characters'
      ]
    }
  },
  methods: {
    ...mapActions([
      'setDeviceId'
    ]),
    sendDeviceId () {
      if (this.$refs.form.validate()) {
        const deviceIdInput = this.deviceIdInput
        this.setDeviceId(deviceIdInput)
        this.$router.push({
          name: 'PollInputPage',
          params: { id: deviceIdInput }
        })
      }
    }
  }
}
</script>
