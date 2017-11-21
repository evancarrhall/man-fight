<template>
  <div class="Game" :class="{ready: activatedHeroes.length === 2, fighting: isFighting}">
    
    <div class="heroesContainer">
      <div class="heroesByAttribute">
        <div class="attributeLabelContainer">
          <div class="attributeLabel">STRENGTH</div>
        </div>
        <div class="heroes" ref="heroes" :style="{width: numberOfColumns * 54 + 'px'}">
          <Hero 
            v-for="hero of heroesByAttr.str" 
            :key="hero.name"
            :hero="hero"
            :class="getHeroClass(hero)"
            :onMousedown = "handleHeroMousedown"
          />
        </div>
      </div>
      <div class="heroesByAttribute">
        <div class="attributeLabelContainer">
          <div class="attributeLabel">AGILITY</div>
        </div>
        <div class="heroes" :style="{width: numberOfColumns * 54 + 'px'}">
          <Hero 
            v-for="hero of heroesByAttr.agi" 
            :key="hero.name"
            :hero="hero"
            :class="getHeroClass(hero)"
            :onMousedown = "handleHeroMousedown"
          />
        </div>
      </div>
      <div class="heroesByAttribute last">
        <div class="attributeLabelContainer">
          <div class="attributeLabel">INTELLIGENCE</div>
        </div>
        <div class="heroes" :style="{width: numberOfColumns * 54 + 'px'}">
          <Hero 
            v-for="hero of heroesByAttr.int" 
            :key="hero.name"
            :hero="hero"
            :class="getHeroClass(hero)"
            :onMousedown = "handleHeroMousedown"
          />
        </div>
      </div>
    </div>
    <div class="overlay"></div>
    <div class="filterText">{{overlayText}}</div>
    <Fab class="fab"
      :text="isFighting ? 'CANCEL' : 'MAN FIGHT'"
      :click="handleFabClick"   
    />

    <Fight v-if="isFighting" :isFighting="isFighting" :heroes="activatedHeroes" />

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
import Fab from './Fab'
import Fight from './Fight'

  export default {
    name: 'Game',
    components: {
      Hero,
      Fab,
      Fight
    },
    data() {
      return {
        heroData: heroData,
        numberOfColumns: null,
        isCollapsed: null,
        overlayText: '',
        overlayCounter: null,
        activatedHeroes: [],
        isFighting: false,
      }
    },
    computed: {
      heroesByAttr() {
        return Object.values(this.heroData).reduce((heroesByAttr, hero) => {
          if(!heroesByAttr[hero.main_attr]) heroesByAttr[hero.main_attr] = {}
          heroesByAttr[hero.main_attr][hero.name] = hero
          return heroesByAttr
        } , {})
      },
    },
    mounted() {
      this.isCollapsed = this.getIsCollapsed()
      this.numberOfColumns = this.getNumOfColumns()
      window.addEventListener('resize', (e) => {
        this.isCollapsed = this.getIsCollapsed()
        this.numberOfColumns = this.getNumOfColumns()
      })
      window.addEventListener('keydown', this.handleKeypress)
    },
    methods: {
      updateHeroLeft(hero) {
        this.heroLeft = hero
      },
      updateHeroRight(hero) {
        this.heroRight = hero
      },
      getIsCollapsed() {
        return window.innerWidth <= 650
      },
      getNumOfColumns() {
        const width = this.isCollapsed ? window.innerWidth - 20 : window.innerWidth - 25 - 2 - 15 - 60
        return Math.min( Math.floor( width / 54 ) , 22)
      },
      handleKeypress(e) {
        // e.preventDefault()
        if(e.key === 'Escape')  this.overlayText = ''
        else if(e.key === 'Backspace') this.overlayText = this.overlayText.slice(0, this.overlayText.length - 1)
        else if(e.key.match(`^[A-Za-z ]$`)) this.overlayText += e.key
      },

      // 
      getHeroClass(hero) {
        let classArray = []
        if(this.overlayText !== '') {
          ~hero.name.toLowerCase().indexOf(this.overlayText.toLowerCase()) ? classArray.push("matched") : classArray.push("filtered")
        }
        if(this.activatedHeroes.includes(hero)) classArray.push('activated')
        return classArray
      },
      handleHeroMousedown(hero) {
        if(this.activatedHeroes.includes(hero)) this.activatedHeroes.splice(this.activatedHeroes.indexOf(hero), 1)
        else if(this.activatedHeroes.length < 2) this.activatedHeroes.push(hero)
      },
      handleFabClick() {
        if(this.activatedHeroes.length === 2) this.isFighting = !this.isFighting
      }
    }
  }

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.body, html {
  font-smoothing: antialiased;
}
.Game {
  height: 100%;
  min-height: 100vh;
  background-color: #526c7f;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.Game .heroesContainer {
  margin: 45px 30px;
}
.Game .heroesByAttribute {
  display: flex;
  margin-bottom: 20px;
}
.Game .heroesByAttribute.last {
  margin-bottom: 0;
}
.Game .attributeLabelContainer {
  position: relative;
  flex: none;
  width: 0px;
  margin: 5px 15px 5px 25px;
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
  padding-bottom: 20px;
}
.Game .Hero {
  display: inline-block;
}
.Game.ready .Hero {
  pointer-events: none;
}
.Game.ready .Hero.activated {
  pointer-events: unset;
}
.Game.fighting .Hero.activated {
  pointer-events: none;
}
.Game .Hero.hover {
  position: relative;
  left: 0;
  bottom: 0;
  z-index: 7;
}
.Game .Hero.activated .imgContainer {
   box-shadow: 0px 0px 4px 3px rgba(255,255,100,1),
    0px 0px 10px 4px rgba(255,255,100,1),
    0px 0px 20px 6px rgba(255,255,100,1)!important;
  z-index: 6;
}
.Game.fighting .Hero.activated .imgContainer {
  z-index: 5;
}
.Game .Hero img {
  transition: filter 300ms ease;
}
.Game .Hero.filtered img {
  filter: grayscale(1) brightness(0.35);
}
.Game .Hero.matched .imgContainer {
  box-shadow:
    0px 0px 10px 0px rgba(255,255,255,1);
}
.Game .overlay {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  user-select: none;
  pointer-events: none;
  background-color: rgba(0,0,0,0.7);
  opacity: 0;
  transition: opacity 200ms ease;
}
.Game.ready .overlay {
  opacity: 1;
}
.Game .filterText {
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8); 
  color: rgba(255,255,255,0.95);
  text-transform: uppercase;
  letter-spacing: 4px;
  font-family: 'Open Sans';
  text-align: center;
  overflow-wrap: break-word;
  font-size: 72px;
  user-select: none;
  pointer-events: none;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  user-select: none;
  pointer-events: none;
  z-index: 7;
}
.Game .Fab {
  position: fixed;
  right: 50px;
  bottom: 20px;
  z-index: 9;
}
.Game .Fab img {
  filter: brightness(120%) saturate(0%) contrast(160%);
}
.Game.ready .Fab img {
  filter: unset;
}
.Game.fighting .Fab img {
  filter: hue-rotate(-130deg) saturate(170%) brightness(0.8) contrast(1.3);
}
.Game.ready .Fab::before {
  opacity: 1;
  box-shadow: 0px 0px 70px 20px rgba(255,255,255, 0.5);
}
@media (max-width: 650px) {
  .Game .heroesContainer {
    margin: 25px 0;
  }
  .Game .heroesByAttribute {
    flex-flow: column;
  }
  .Game .attributeLabelContainer {
    width: calc(100% - 10px);
    border-right: unset;
    border-bottom: 2px solid rgba(255,255,255,0.5);
    margin: 0 0 5px 5px;
    justify-content: flex-start;
  }
  .Game .attributeLabel {
    transform: unset;
    padding-bottom: 3px;
    position: unset;
  }
  .Game .Fab {
    right: 5%;
  }
}
@media (max-width: 385px) {
  .Game .Fab {
    left: 5%;
  }
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