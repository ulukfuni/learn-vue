<script>
export default {
  name:'LabelInput',
  props: {
    labelText: String,
    optDesc: String,
    inputModel: String,
    inputType: String,
    required: Boolean,
    placeholder: String,
  },
  data () {
    return {
      input: this.inputModel
    }
  },
  // methods: {
  //   handleInput(e) {
  //     console.log(e.target.value)
  //     this.$emit('input', this.input)
  //   }
  // }
}
</script>
<template>
  <b-form-group
    v-bind:label="labelText"
    v-bind:description="optDesc"
  >
    <b-form-input
      v-model="input"
      v-bind:type="inputType"
      v-bind:required="required"
      v-bind:placeholder="placeholder"
    ></b-form-input>
  </b-form-group>
</template>