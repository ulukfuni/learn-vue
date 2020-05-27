<template>
  <div>
    <div>{{ count }}</div>
    <button v-on:click="increment">+</button>
    <button v-on:click="decrement">-</button>
  </div>
</template>
<script>
export default {
  name: 'Counter',
  data () {
    return { count: 0 }
  },
  methods: {
    increment () {
      this.count++
    },
    decrement () {
      this.count--
    }
  }
}
</script>
<style scoped>

</style>