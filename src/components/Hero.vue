<template>
  <div>
    <input @input="handleChange" />
    <HeroDetails :hero="hero" />
  </div>
  
</template>

<script>
  import HeroDetails from './HeroDetails.vue'

  export default {
    name: 'Hero',
    components: {
      HeroDetails,
    },
    props: ["heroes", "updateHero"],
    data() {
      return {
        input: ''
      }
    },
    computed: {
      hero: function() {
        for(const hero of this.heroes) {
          if(hero.name === this.input) {
            this.updateHero(hero)
            return hero
          }
        }
        this.updateHero(null)
        return null
      }
    },
    mounted() {},
    methods: {
      handleChange(event) {
        this.input = event.target.value
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
  }
</style>