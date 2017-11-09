<template>
  <div class="Hero">
    <input @input="handleChange" spellcheck="false"/>
    <HeroDetails class="heroDetails" :hero="hero" />
  </div>
  
</template>

<script>
  import HeroDetails from './HeroDetails'

  export default {
    name: 'Hero',
    components: {
      HeroDetails,
    },
    props: ["updateHero", 'heroStatsObj'],
    data() {
      return {
        input: ''
      }
    },
    computed: {
      hero() {
        if(this.heroStatsObj[this.input.toLowerCase()]) {
          const h = this.makeHero(this.heroStatsObj[this.input.toLowerCase()])
          this.updateHero(h)
          return h
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

<style>
.Hero {
  width: 50%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
}
.Hero input {
  position: absolute;
  height: 100%;
  width: 50%;
  text-align: center;
  font-size: 50px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-decoration: none;
  border: none;
  text-transform: uppercase;
}
.Hero input:focus {
  outline-width: none;
}
.Hero .heroDetails {
  z-index: 2;
}
</style>