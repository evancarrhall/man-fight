<template>
  <div class="FightHero">
    <div class="healthbar">
      <div class="empty"></div>
      <div class="full" :style="{width: Math.max(hero.hp / hero.hp_max * 100, 0) + '%'}"></div>
    </div>
    <img :src="'/static/landscapes/' + hero.img">
    <div class="name">{{hero.name}}</div>
  </div>
</template>

<script>
  export default {
    name: 'FightHero',
    props: ['hero'],
    data() {
      return {}
    },
    computed: {},
    mounted() {},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.FightHero {
  /* transform: scale(2); */
  position: relative;
  width: 256px;
  display: flex;
  flex-flow: column-reverse;
  background-color: rgba(0,0,0,0.1)
}
.FightHero .name {
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0; */
  margin-bottom: 5px;
  /* background-color: rgba(20,20,20,0.45); */
  color: rgba(255,255,255,0.95);
  text-transform: uppercase;
  letter-spacing: 1.8px;
  font-family: 'Open Sans';
  text-align: center;
  /* padding: 5px 10px; */
  font-size: 18px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8); 
}
.FightHero img {
  width: 100%;
  min-height: 144px;
  box-shadow: 0px 0px 70px 15px rgba(0, 0, 0, 0.9);
}
.FightHero .healthbar {
  position: relative;
  bottom: -3px;
  overflow: hidden;
  width: 100%;
  height: 5px;
}
.FightHero .healthbar .empty {
  position: absolute;
  left:0;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 100, 100, 0.9);
}
.FightHero .healthbar .full {
  position: absolute;
  left:0;
  width: 100%;
  height: 100%;
  background-color: rgba(120, 190, 120, 0.9);
}
</style>