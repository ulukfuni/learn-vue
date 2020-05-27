<template>
  <div class="container">
    <div>
      <label>Username</label>
      <input name="username" type="text" v-model="username" v-on:focus="resetError" />
    </div>
    <div>
      <label>Password</label>
      <input name="password" type="password" v-model="password" v-on:focus="resetError" />
    </div>
    <button v-on:click="submit">Submit</button>
    <div v-if="error">
      <p v-show="!validate">Invalid</p>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'LogIn',
  // state
  data () {
    return {
      username: '',
      password: '',
      error: false,
    }
  },
  // calculated state, i.e. form validations, filtering info, etc.
  computed: {
    validate () {
      if (this.username.length < 8 || this.password.length < 8) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    resetError () {
      this.error = false
    },
    submit () {
      if (this.validate) {
        console.log(this.username, this.password)
      } else {
        this.error = true
        console.log('invalid')
      }

    }
  },
  // watch data, use name of data to watch it
  watch: {
    username (newValue, oldValue) {
      console.log('its changing', newValue, oldValue)
    }
  }
}
</script>
<style scoped>

</style>