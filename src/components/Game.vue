<template>
  <div id="Game">
    <div id="heroAreas">
      <Hero id="heroLeft" class="Hero" :updateHero="updateHeroLeft" />
      <Hero id="heroRight" class="Hero" :updateHero="updateHeroRight" />
    </div>
    <FightResults id="FightResults" :heroesRef="[heroLeft, heroRight]" />
  </div>
</template>

<script>
import Hero from './Hero'
import FightResults from './FightResults'

  export default {
    name: 'Game',
    components: {
      Hero,
      FightResults,
    },
    data() {
      return {
        heroLeft: null,
        heroRight: null,
      }
    },
    computed: {},
    mounted() {},
    methods: {
      updateHeroLeft(hero) {
        this.heroLeft = hero
      },
      updateHeroRight(hero) {
        this.heroRight = hero
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #Game {
    height: 100%;
  }
  #heroAreas {
    height: 100%;
    display: flex;
  }
  #FightResults {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f4f4f4
  }

</style>