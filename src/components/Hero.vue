<template>
  <div>
    <input @input="handleChange" />
    <HeroDetails :hero="hero" />
  </div>
  
</template>

<script>
  import HEROES from '../assets/heroes'
  import HeroDetails from './HeroDetails'

  export default {
    name: 'Hero',
    components: {
      HeroDetails,
    },
    props: ["updateHero"],
    data() {
      return {
        input: ''
      }
    },
    computed: {
      hero: function() {
        for(const hero of HEROES) {
          if(hero.name === this.input) {
            const h = this.makeHero(hero)
            this.updateHero(h)
            return h
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
      },
      makeHero(h) {
        let hero = Object.assign({}, h)
        hero.hp = hero.str * 20 + 200
        hero.batTick = hero.bat * 30
        hero.atkTimer = 0.00
        hero.armorValueMultiplier = 1 - 0.06 * hero.armor / (1 + 0.06 * Math.abs(hero.armor))
        hero.hps = hero.base_hps + hero.str * 0.06
        hero.heal_per_tick = hero.hps / 30
        return hero
      },
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