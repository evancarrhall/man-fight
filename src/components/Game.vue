<template>
  <div class="Game">
    <div class="heroesContainer">
      <div class="heroesByAttribute">
        <div class="attributeLabelContainer">
          <div class="attributeLabel">STRENGTH</div>
        </div>
        <div class="heroFlex">
          <Hero 
            v-for="hero of heroesByAttr.str" 
            :key="hero.name"
            :hero="hero"
          />
        </div>
      </div>
      <div class="heroesByAttribute">
        <div class="attributeLabelContainer">
          <div class="attributeLabel">AGILITY</div>
        </div>
        <div class="heroFlex">
          <Hero 
            v-for="hero of heroesByAttr.agi" 
            :key="hero.name"
            :hero="hero"
          />
        </div>
      </div>
      <div class="heroesByAttribute">
        <div class="attributeLabelContainer">
          <div class="attributeLabel">INTELLIGENCE</div>
        </div>
        <div class="heroFlex">
          <Hero 
            v-for="hero of heroesByAttr.int" 
            :key="hero.name"
            :hero="hero"
          />
        </div>
      </div>
    </div>
    <!-- <div v-if="false">
      <div id="heroAreas">
        <Hero id="heroLeft" class="Hero" :updateHero="updateHeroLeft" :heroStatsObj="heroStatsObj" />
        <Hero id="heroRight" class="Hero" :updateHero="updateHeroRight" :heroStatsObj="heroStatsObj" />
      </div>
      <FightResults id="FightResults" :heroesRef="[heroLeft, heroRight]" />
    </div> -->
  </div>
</template>

<script>
import heroData from '../assets/heroData.json'
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
        portraits: null,
        heroData: heroData,
      }
    },
    computed: {
      heroesByAttr() {
        return Object.values(this.heroData).reduce((heroesByAttr, hero) => {
          if(!heroesByAttr[hero.main_attr]) heroesByAttr[hero.main_attr] = {}
          heroesByAttr[hero.main_attr][hero.name] = hero
          return heroesByAttr
        } , {})
      }
    },
    mounted() {

    },
    methods: {
      updateHeroLeft(hero) {
        this.heroLeft = hero
      },
      updateHeroRight(hero) {
        this.heroRight = hero
      },
    }
  }

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.Game {
  height: 100%;
  min-height: 100vh;
  background-color: #526c7f;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Game .heroesContainer {
  width: 1230px;
}
.Game .heroesByAttribute {
  display: flex;
  margin-bottom: 20px;
}
.Game .attributeLabelContainer {
  position: relative;
  width: 30px;
  min-height: 200px;
  margin: 5px 15px 5px 0;
  border-right: 2px solid rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.Game .attributeLabel {
  font-family: 'Open Sans';
  font-size: 12px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.5);
  position: absolute;
  user-select: none;
  cursor: default;
  transform: rotate(-90deg);
  padding-bottom: 10px;

}
.Game .heroFlex {
  display: flex;
  flex-flow: wrap;
}
/* #heroAreas {
  height: 100%;
  display: flex;
}
#FightResults {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f4f4f4
} */
</style>