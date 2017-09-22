<template>
  <div>
    <button @click="calculateFight">Fight!</button>
    <h2>{{tick}}</h2>
    <HeroDetails :hero='heroLeft' />
    <HeroDetails :hero='heroRight' />
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
      }
    },
    computed: {},
    mounted() {},
    methods: {
      calculateFight() {
        if(this.heroesRef[0] && this.heroesRef[1]) {
          this.makeHero("Left", this.heroesRef[0])
          this.makeHero("Right", this.heroesRef[1])
        } else {
          this.heroLeft = null
          this.heroRight = null
        }
        this.tick = 0
        this.simulateTick()
      },
      makeHero(leftOrRight, hero) {
        let h = "hero" + leftOrRight
        this[h] = Object.assign({}, hero)
        this[h].hp = hero.str * 20 + 200
        this[h].batTick = hero.bat * 30
        this[h].atkTimer = 0.00
      },
      simulateTick() {
        while(this.heroLeft.hp >= 0 && this.heroRight.hp >= 0) {
          let hl = Object.assign({}, this.heroLeft)
          let hr = Object.assign({}, this.heroRight)

          // heroLeft
          if(hl.atkTimer >= hl.batTick) {
            hr.hp -= hl.min
            hl.atkTimer = -1
          }
          hl.atkTimer = hl.atkTimer + 1

          this.heroLeft = hl
          this.heroRight = hr

          // heroRight
          if(hr.atkTimer >= hr.batTick) {
            hl.hp -= hr.min
            hr.atkTimer = -1
          }
          hr.atkTimer = hr.atkTimer + 1

          this.heroLeft = hl
          this.heroRight = hr

          this.tick++
        }
      },
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
</style>