<script>
import LabelInput from './LabelInput'
export default {
  name: 'MenuForm',
  components: {
    LabelInput
  },
  data() {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true
    }
  },
  computed: {

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      console.log(this.form)
      // alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
<template>
  <b-card class="container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <LabelInput 
        labelText="Email address:"
        optDesc="We'll never share your email with anyone else"
        v-bind:inputModel="form.email"
        inputType="email"
        v-bind:required="true"
        placeholder="Enter email"
      />

      <b-form-group
        label="Email address:"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <LabelInput 
        labelText="Test"
        optDesc="This is a test"
        inputModel="form.name"
        inputType="text"
        v-bind:required="false"
        placeholder="Still a test"
      />

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </b-card>
</template>
<style>

</style>