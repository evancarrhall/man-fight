<template>
  <div>
    <Hero id="heroLeft" class="hero" :updateHero="updateHeroLeft" />
    <Hero id="heroRight" class="hero" :updateHero="updateHeroRight" />
    <FightResults :heroesRef="[heroLeft, heroRight]" />
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
  div {
    display: flex;
  }
  .hero {
    width: 200px;
  }
</style>