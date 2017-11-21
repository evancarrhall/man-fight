<template>
  <div class="Fight">
    <transition
      appear
      name="custom-classes-transition"
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceOutLeft"
    >
      <FightHero v-show="isFighting" :hero="simHeroes[0]" />
    </transition>
    <div class="center"></div>
    <transition
      appear
      name="custom-classes-transition"
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight"
    >
      <FightHero v-show="isFighting" :hero="simHeroes[1]" class="fightHeroBottom" />
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Simulation from './Simulation'
  import FightHero from './FightHero'
  export default {
    name: 'Fight',
    components: {FightHero, Simulation},
    props: ['heroes', 'isFighting'],
    data() {
      return {
        simHeroes: [this.buildHero(Object.assign({}, this.heroes[0])), this.buildHero(Object.assign({}, this.heroes[1]))]
      }
    },
    computed: {},
    mounted() {
      setTimeout(this.calculateFight, 1000)
    },
    methods: {
      calculateFight() {

        function simulateTick(hl, hr) {
          if(hl.hp <= 0 || hr.hp <= 0) return

          // hps
          hl.hp += hl.heal_per_tick
          hr.hp += hr.heal_per_tick


          // heroLeft attack
          if(hl.atkTimer >= hl.batTick) {
            Vue.set(hr, 'hp', hr.hp -= calcDamage(hl, hr))
            hl.atkTimer = -1
          }
          hl.atkTimer = hl.atkTimer + 1

          // heroRight attack
          if(hr.atkTimer >= hr.batTick) {
            Vue.set(hl, 'hp', hl.hp -= calcDamage(hr, hl))
            hr.atkTimer = -1
          }
          hr.atkTimer = hr.atkTimer + 1

          var tickrate_multiplier = 5
          setTimeout(() => simulateTick(hl, hr), 1000 / 30 / tickrate_multiplier)

          function calcDamage(source, target) {
            const base_attack_damage = getRandomInt(source.min, source.max)
            const main_damage = base_attack_damage + source[source.main_attr]
            const final_damage = main_damage * target.armorValueMultiplier
            return final_damage
          }

          function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
        }

        var tick = 0
        // var results = [{l: heroLeft, r: heroRight, tick: tick}]
        simulateTick(this.simHeroes[0], this.simHeroes[1])
        // results.push({l: this.heroLeft, r: this.heroRight, tick: tick})
      },

      buildHero(hero) {
        hero.hp_max = hero.str * 20 + 200
        hero.hp = hero.hp_max
        hero.batTick = hero.bat * 30
        hero.atkTimer = 0.00
        hero.armorValueMultiplier = 1 - 0.06 * hero.armor / (1 + 0.06 * Math.abs(hero.armor))
        hero.hps = hero.base_hps + hero.str * 0.06
        hero.heal_per_tick = hero.hps / 30
        return hero
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Fight {
  position: fixed;
  pointer-events: none;
  z-index: 6;
  top: 0;
  right: 0;
  bottom: 0;
  margin-bottom: 70px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Fight .center {
  width: 200px;
}
@media (max-width: 1000px) {
  .Fight .center {
    width: 20%;
  }
}
@media (max-width: 800px) {
  .Fight {
    flex-flow: column;
  }
  .Fight .center {
    height: 100px;
  }
  .Fight .FightHero.fightHeroBottom {
    
  }
}
@media (max-height: 800px) {
  .Fight .center {
    height: 100px;
  }
}
</style>