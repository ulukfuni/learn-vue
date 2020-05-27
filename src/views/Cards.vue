<template>
  <div>
    <DrawCards :deckId="drawCardsDeckId" />
    <War />
  </div>
</template>
<script>
import DrawCards from '../components/DrawCards'
import War from '../components/War'
export default {
  name: 'CardsPage',
  components: {
    DrawCards, War
  },
  data() {
    return {
      drawCardsDeckId: '',
      warDeckId: '',
    }
  },
  created() {
    console.log('cards page was created')
    this.getDeck('drawCardsDeckId')
  },
  mounted() {
    console.log('cards page was mounted')
  },
  methods: {
    async getDeck(deck) {
      const url = `https://deckofcardsapi.com/api/deck/new/`
      const res = await fetch(url)
      const json = await res.json()
      if (json.success) {
        this[deck] = json.deck_id
      }
    }
  }
}
</script>
<style scoped>

</style>