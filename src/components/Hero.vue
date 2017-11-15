<template>
  <div class="Hero" :class="{hover: isHover}">
    <div 
      class="hoverContainer"
      @mouseover="handleMouseover"
      @mouseout="handleMouseout"
      @mousedown="handleMousedown"
    >
    </div>
    <div class="newHeroLabel" v-if="hero.isNew">NEW</div>
    <div class="imgContainer">
      <img :src="'/static/portraits/' + hero.img">
      <div class="hoverLabel" v-if="isHover">{{hero.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Hero',
    props: ['hero', 'onMouseover', 'onMouseout', 'onMousedown'],
    data() {
      return {
        isHover: false,
      }
    },
    computed: {},
    mounted() {},
    methods: {
      handleMouseover() {
        this.isHover = true
        if(this.onMouseover) this.onMouseover(this.hero)
      },
      handleMousedown() { 
        if(this.onMousedown) this.onMousedown(this.hero)
        else {

        }
      },
      handleMouseout() {
        this.isHover = false
        if(this.onMouseout) this.onMouseout(this.hero)
      },
    }
  }
</script>

<style>
.Hero {
  position: relative;
  margin: 5px;
  user-select: none;
}
.Hero .hoverContainer {
  height: 94px;
  width: 44px;
}
.Hero .imgContainer {
  position: absolute;
  height: 94px;
  width: 44px;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  box-sizing: border-box;
  background-color: rgba(0,0,0,0.2);
  transition: all 120ms ease;
}
.Hero .newHeroLabel {
  position: absolute;
  font-size: 14px;
  letter-spacing: 0.5px;
  font-family: 'Open Sans';
  color: rgba(241, 188, 220, 1);
  text-shadow: 
    2px 2px 15px #a84c7d, 
    -2px -2px 15px #a84c7d, 
    2px -2px 15px #a84c7d, 
    -2px 2px 15px #a84c7d,
    0 0 7px #000, 
    0 0 7px #000;
  top: -10px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1;
  transition: all 120ms ease;
}
.Hero.hover .newHeroLabel {
  top: -70px;
  font-size: 20px;
  letter-spacing: 1.8px;
}
.Hero .imgContainer img {
  margin-left: 50%;
  transform: translateX(-50%);
  height: 100%;
}
.Hero.hover .imgContainer {
  height: 186px;
  width: 140px;
  top: -46px;
  left: -48px;
  z-index: 3;
  border: 3px solid rgba(0,0,0,1);
  background-color: rgba(0,0,0,1);
  filter: brightness(140%);
}
.Hero .imgContainer .hoverLabel {
  position: absolute;
  bottom: 0;
  width: 140px;
  background-color: rgba(20,20,20,0.45);
  color: rgba(255,255,255,0.95);
  text-transform: uppercase;
  letter-spacing: 1.8px;
  font-family: 'Open Sans';
  text-align: center;
  padding: 5px 10px;
  font-size: 13px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8); 
}
</style>