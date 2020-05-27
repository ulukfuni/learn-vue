<template>
  <div class="container">
    <h1>War</h1>
    <div class="row">
      <div class="col">
        Player 1
        <p>Current Card: {{ p1.currentCard.str }}</p>
        <p>Remaining Card Count: {{ p1.remainingCardCount }}</p>
      </div>
      <div class="col">
        Player 2
        <p>Current Card: {{ p2.currentCard.str }}</p>
        <p>Remaining: {{ p2.remainingCardCount }}</p>
      </div>
    </div>
    <div v-show="result !== ''">Result: {{ result }}</div>
    <div>
      <button v-on:click="playRound" :disabled="disableBtn">Play Round</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'War',
  data() {
    return {
      deckId: '',
      p1: {
        currentCard: {
          code: '',
          value: '',
          suit: '',
          str: '',
        },
        pileName: 'p1',
        remainingCardCount: ''
      },
      p2: {
        currentCard: {
          code: '',
          value: '',
          suit: '',
          str: '',
        },
        pileName: 'p2',
        remainingCardCount: ''
      },
      result: '',
      disableBtn: false,
    }
  },
  mounted() {
    // split deck into 2 (get two piles)
    this.splitDecks()
  },
  computed: {
    // checkRemainingForWinner() {},
  },
  methods: {
    async playRound() {
      // draw from each pile
      await this.drawCardFromPile(this.p1.pileName, 'p1')
      await this.drawCardFromPile(this.p2.pileName, 'p2')
      // compare cards and see who wins round
      const winner = this.whoWinsRound()
      // winners get rounds' cards (add both card to pile id)
      await this.addCardsToPile(this[winner].pileName, [ this.p1.currentCard.code, this.p2.currentCard.code ])
      // check for winner
      if (this.p1.remainingCardCount == 52) {
        this.result = 'Player 1 Wins War'
        // disable button
        this.disableBtn = true
      } else if (this.p2.remainingCardCount == 52) {
        this.result = 'Player 2 Wins War'
        // disable button
        this.disableBtn = true
      }
    },
    async drawCardsFromDeck(id, count) {
      const drawCardsUrl = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${count}`
      try {
        const res = await fetch(drawCardsUrl)
        const json = await res.json()
        if (json.success) {
          this.deckId = json.deck_id
          return json
        } else {
          throw new Error('something went wrong with drawing 26 cards')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async drawCardFromPile(pile, player) {
      const url = `https://deckofcardsapi.com/api/deck/${this.deckId}/pile/${pile}/draw/bottom?count=1`
      try {
        const res = await fetch(url)
        const json = await res.json()
        if (json.success) {
          const card = json.cards[0]
          this[player].currentCard.str = `${card.value} of ${card.suit}`
          this[player].currentCard.code = card.code
          this[player].currentCard.suit = card.suit
          this[player].currentCard.value = card.value
          this[player].remainingCardCount = json.piles[pile].remaining
        } else {
          throw new Error(`error trying to draw from pile ${pile} for player ${player}`)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async splitDecks() {
      // draw 26 cards
      const p1Cards = await this.drawCardsFromDeck('new', 26)
      // add to 1 pile
      await this.addCardsToPile(this.p1.pileName, p1Cards.cards.map(card => card.code))
      // draw other 26
      const p2Cards = await this.drawCardsFromDeck(this.deckId, 26)
      // add to other pile
      await this.addCardsToPile(this.p2.pileName, p2Cards.cards.map(card => card.code))
    },
    async addCardsToPile(pileName, cardsArr) {
      const pileUrl = `https://deckofcardsapi.com/api/deck/${this.deckId}/pile/${pileName}/add/?cards=${cardsArr.join(',')}`
      try {
        if (this.deckId === '') {
          throw new Error('cant add to pile with no deckId')
        }
        const res = await fetch(pileUrl)
        const json = await res.json()
        if (json.success) {
          this[pileName].remainingCardCount = json.piles[pileName].remaining
        } else {
          throw new Error('error with adding to pile')
        }
      } catch (e) {
        console.log(e)
      }
    },
    whoWinsRound() {
      const values = {
        HEARTS: 4,
        DIAMONDS: 3,
        CLUBS: 2,
        SPADES: 1,
        ACE: 14,
        KING: 13,
        QUEEN: 12,
        JACK: 11
      }
      const p1Value = isNaN(this.p1.currentCard.value) ? values[this.p1.currentCard.value] : Number(this.p1.currentCard.value)
      const p2Value = isNaN(this.p2.currentCard.value) ? values[this.p2.currentCard.value] : Number(this.p2.currentCard.value)
      if (p1Value > p2Value) {
        this.result = 'Player 1 Wins'
        return 'p1'
      } else if (p1Value < p2Value) {
        this.result = 'Player 2 wins'
        return 'p2'
      } else if (p1Value === p2Value) {
        const p1Suit = this.p1.currentCard.suit
        const p2Suit = this.p2.currentCard.suit
        if (values[p1Suit] > values[p2Suit]) {
          this.result = 'Player 1 Wins'
          return 'p1'
        } else if (values[p1Suit] < values[p2Suit]) {
          this.result = 'Player 2 Wins'
          return 'p2'
        }
      }
    },
  }
}
</script>
<style>

</style>