<template>
  <div>
    <button @click="calculateFight">Fight!</button>
    <ul>
      <li v-for="result in results">
        <p>{{Math.round(result.l.hp)}}</p><p>{{Math.round(result.r.hp)}}</p><p>{{result.tick}}</p>
      </li>
    </ul>
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
    computed: {},
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
        }
      },
      simulateTicks() {
        while(this.heroLeft.hp >= 0 && this.heroRight.hp >= 0) {
          //simulates one tick and end if hp is less than zero
          let hl = Object.assign({}, this.heroLeft)
          let hr = Object.assign({}, this.heroRight)

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

          if(this.heroLeft.hp !== hl.hp || this.heroRight.hp !== hr.hp)
            this.results.push({l: hl, r: hr, tick: this.tick})
          this.heroLeft = hl
          this.heroRight = hr

          this.tick++
        }
      },
      calcDamage(source, target) {
        const base_attack_damage = this.getRandomInt(source.min, source.max)
        const main_damage = base_attack_damage + source[source.main_attr]
        const final_damage = main_damage * target.armorValueMultiplier
        return final_damage
      },
      getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      } 
    }
  }
</script>

<style scoped>
  div {
    display: flex;
    align-items: flex-start;
  }

  h2 {
    padding: 30px;
  }

  li {
    display: flex;
  }

  p {
    padding: 0 2px;
  }
</style>