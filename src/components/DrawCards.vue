<template>
  <div class="container">
    <h1>Draw A Card</h1>
    <div>
      Drawn Card: {{ drawnCard || 'none yet' }}
    </div>
    <div>
      Previous Cards:
      <div>
        <span class="block" v-for="card in prevCards" :key="card">{{card}}</span>
      </div>
    </div>
    <div>
      Remaining Cards: {{ remainingCardCount || '52'}}
    </div>
    <button v-on:click="drawCard">Draw Card</button>
    <button v-on:click="shuffleCards">Shuffle Cards</button>
  </div>
</template>
<script>
export default {
  name: 'DrawCards',
  props: {
    deckId: String
  },
  data() {
    return {
      drawnCard: '',
      prevCards: [],
      remainingCardCount: '',
    }
  },
  methods: {
    async drawCard() {
      try {
        const url = `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`
        const res = await fetch(url)
        const json = await res.json()
        console.log(json)
        if (json.success) {
          this.deckId = json.deck_id
          this.drawnCard = `${json.cards[0].value} of ${json.cards[0].suit}`
          this.prevCards.push(this.drawnCard)
          this.remainingCardCount = json.remaining
        } else {
          throw new Error('not success, something went wrong')
        }
      } catch (e) {
        console.log(e)
      } 
    },
    async shuffleCards() {
      if (this.deckId === '') {
        return
      }
      try {
        const url =`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle`
        const res = await fetch(url)
        const json = await res.json()
        console.log(json)
        if (json.success) {
          this.drawnCard = ''
          this.prevCards = []
          this.remainingCardCount = json.remaining
        } else {
          throw new Error('something errored in here')
        }
      } catch (e) {
        console.log(e)
      }
      
    }
  },
  computed: {

  },
}
</script>
<style scoped>
  .block {
    margin: 5px;
    border: 1px solid gainsboro;
    padding: 2px;
    border-radius: 5px;
  }
</style>