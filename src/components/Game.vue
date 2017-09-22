<template>
  <div>
    <Hero id="heroLeft" :heroes="sampleHeroes" :updateHero="updateHeroLeft" />
    <Hero id="heroRight" :heroes="sampleHeroes" :updateHero="updateHeroRight" />
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
        sampleHeroes: [
          { name: 'Abbadon',
            str: 23,
            min: 55,
            max: 65,
            bat: 1.7,
            armor: 1.43, },
          { name: 'Ancient Apparition',
            str: 18,
            min: 44,
            max: 54,
            bat: 1.7,
            armor: 1.86, },
          { name: 'Oracle',
            str: 18,
            min: 39,
            max: 45,
            bat: 1.4,
            armor: 2.14, },
          { name: 'Ogre Magi',
            str: 23,
            min: 58,
            max: 64,
            bat: 1.7,
            armor: 8, }
        ]
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
</style>