<template>
  <div class="FightResults">
    <button @click="calculateFight">Fight!</button>
    <div :class="winnerClass">WINNER</div>
  </div>
</template>

<script>
  import HeroDetails from './HeroDetails'

  export default {
    name: 'FightResults',
    components: {
      HeroDetails
    },
    props: ["heroesRef"],
    data() {
      return {
        heroLeft: {},
        heroRight: {},
        tick: 0,
        results: []
      }
    },
    computed: {
      winnerClass() {
        if(this.heroLeft.hp <= 0 && this.heroRight.hp > 0) {
          return ["winnerRight"]
        } else if (this.heroLeft.hp > 0 && this.heroRight.hp <= 0) {
          return ["winnerLeft"] 
        } else {
          return null
        }
      },
    },
    mounted() {},
    methods: {
      calculateFight() {
        for(var x = 0; x < 1; x++) {
          if(this.heroesRef[0] && this.heroesRef[1]) {
            this.heroLeft = this.heroesRef[0]
            this.heroRight = this.heroesRef[1]
          } else {
            this.heroLeft = null
            this.heroRight = null
          }
          this.tick = 0
          this.results = [{l: this.heroLeft, r: this.heroRight, tick: this.tick}]

          this.simulateTicks()
          this.results.push({l: this.heroLeft, r: this.heroRight, tick: this.tick})
        }
      },
      simulateTicks() {
        while(this.heroLeft.hp >= 0 && this.heroRight.hp >= 0) {
          //simulates one tick and end if hp is less than zero
          let hl = this.heroLeft
          let hr = this.heroRight

          // hps
          hl.hp += hl.heal_per_tick
          hr.hp += hr.heal_per_tick


          // heroLeft attack
          if(hl.atkTimer >= hl.batTick) {
            hr.hp -= this.calcDamage(hl, hr)
            hl.atkTimer = -1
          }
          hl.atkTimer = hl.atkTimer + 1

          // heroRight attack
          if(hr.atkTimer >= hr.batTick) {
            hl.hp -= this.calcDamage(hr, hl)
            hr.atkTimer = -1
          }
          hr.atkTimer = hr.atkTimer + 1
           
          this.heroLeft = hl
          this.heroRight = hr

          this.tick++
        }
      },
      calcDamage(source, target) {
        const base_attack_damage = this.getRandomInt(source.min, source.max)
        const main_damage = base_attack_damage + source[source.main_attr]
        const final_damage = main_damage * target.armorValueMultiplier
        console.log(final_damage)
        return final_damage
      },
      getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
    }
  }
</script>

<style>
  .FightResults {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 150px;
    padding: 10px 20px;
  }
  button {
    margin: 10px 0 10px 0;
  }
  .winnerLeft {
    display:flex;
    justify-content: flex-start;
    width: 100%;
  }
  .winnerRight {
    display:flex;
    justify-content: flex-end;
    width: 100%;
  }

</style>