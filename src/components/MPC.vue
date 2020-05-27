<template>
  <div class="container">
    <input type='file' name="sound-upload" @change="handleFileUpload" />
    <flex class="container" flexWrap="wrap" width="80%">
      <color-card v-for="sound in sounds" :key="sound" v-on:click="playSound(sound)" v-bind:backgroundColor="currentSound === sound ? 'blue' : null" v-bind:color="currentSound === sound ? 'white' : null">{{sound}}</color-card>
    </flex>
  </div>
</template>
<script>
import styled from 'vue-styled-components'
// import howler from 'howler'

const ColorCard = styled('div', { backgroundColor: String, color: String })`
  ${props => (props.backgroundColor ? `background-color: ${props.backgroundColor};` : null)};
  ${props => (props.color ? `color: ${props.color}` : `color: inherit;`)};
  border-radius: 5px;
  padding: 15px;
  font-weight: 700;
  font-size: 1.3rem;
  box-shadow: 5px 2px 8px 1px #ccc;
  margin: 5px 15px;
  &:hover {
    cursor: pointer;
  }
`
const flexProps = {
  display: String,
  alignItems: String,
  justifyContent: String,
  flexDirection: String,
  width: String,
  height: String,
  flexWrap: String,
  mobileWidth: String,
  mobileDisplay: String,
}
const Flex = styled('div', flexProps)`
		${props => (props.display ? `display: ${props.display};` : `display: flex;` )}
    ${props => (props.alignItems ? `align-items: ${props.alignItems};` : null )}
    ${props => (props.justifyContent ? `justify-content: ${props.justifyContent};` : null )}
    ${props => (props.flexDirection ? `flex-direction: ${props.flexDirection};` : null )}
    ${props => (props.width ? `width: ${props.width};` : null )}
    ${props => (props.height ? `height: ${props.height};` : null )}
    ${props => (props.flexWrap ? `flex-wrap: ${props.flexWrap};` : null )}
		@media screen and (max-width: 767px) {
			${props => (props.mobileWidth ? `width: ${props.mobileWidth};` : null )}
			${props => (props.mobileDisplay ? `display: ${props.mobileDisplay};` : null )}
		}
`
export default {
  name: 'MPC',
  components: { 'color-card': ColorCard, 'flex': Flex },
  data() {
    return {
      sounds: ['kick', 'hat', 'clap', 'snare', '808', 'stick', 'crash', 'tom'],
      currentSound: '',
      file: null,
      uploadedSound: null,
    }
  },
  methods: {
    playSound(sound) {
      console.log(sound)
      this.currentSound = sound
      const self = this
      setTimeout(function() {
        self.currentSound = ''
      }, 300)
    },
    handleFileUpload(e) {
      this.file = e.target.files[0]
      // const file = e.target.files[0]
      // check for audio
      console.log(e.target.files[0])
      // const reader = new FileReader();
      // reader.addEventListener('load', function() {
      //   const data = reader.result;
      //   // Create a Howler sound
      //   const sound = new Howl({
      //     src: data,
      //     format: file.name.split('.').pop().toLowerCase(), // always give file extension: this is optional but helps
      //   });
      // })
      // reader.readAsDataURL(file);
    },
  },
}
</script>
<style>

</style>