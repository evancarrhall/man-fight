<template>
  <div class="Game">
    
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
          />
        </div>
      </div>
    </div>
    <div class="filterOverlay" v-show="overlayText !== ''">{{overlayText}}</div>
    <Fab class="fab" />
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
import Fab from './Fab'

  export default {
    name: 'Game',
    components: {
      Hero,
      FightResults,
      Fab,
    },
    data() {
      return {
        heroLeft: null,
        heroRight: null,
        portraits: null,
        heroData: heroData,
        numberOfColumns: null,
        isCollapsed: null,
        overlayText: '',
        overlayCounter: null
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
        if(e.key === 'Escape')  this.overlayText = ''
        else if(e.key === 'Backspace') this.overlayText = this.overlayText.slice(0, this.overlayText.length - 1)
        else if(e.key.match(`^[A-Za-z]$`)) this.overlayText += e.key
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
.Game .filterOverlay {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  color: rgba(255,255,255,0.95);
  text-transform: uppercase;
  letter-spacing: 4px;
  font-family: 'Open Sans';
  text-align: center;
  font-size: 72px;
  z-index: 5;
  user-select: none;
}
.Game .Fab {
  position: fixed;
  right: 50px;
  bottom: 15px;
  z-index: 9;
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