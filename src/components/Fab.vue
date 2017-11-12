<template>
  <div class="Fab"
    @mouseover="()=>{}"
    @mouseout="()=>{}"
    @mousedown="()=>{}"
  >
    <img src="../assets/fab.png" >
    <div class="text">MAN FIGHT</div>
  </div>
</template>

<script>
  export default {
    name: 'Fab',
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
.Fab {
  position: relative;
  height: 49px;
  box-shadow: 0px 0px 4px 1px rgba(0,34,255,0.55);
  user-select: none;
}
.Fab:hover {
  box-shadow: 
    0px 0px 4px 1px rgba(255,255,255,0.2);
}
.Fab::before {
  content: ' ';
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: opacity 100ms linear;
  box-shadow: 0px 0px 35px 2px rgba(255,255,255, 0.5);
}
.Fab:hover::before {
  opacity: 1;
}
.Fab::after {
  content: ' ';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 100ms linear;
  background-color: rgba(255, 255, 255, 1);
}
.Fab:hover::after {
  opacity: 0.07;
}
.Fab:active::after {
  opacity: 0.15;
}
.Fab img {
  height: 100%;
}
.Fab .text {
  position: absolute;
  top: 2px;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
  color: rgba(255,255,255,0.95);
  letter-spacing: 1.8px;
  font-family: 'Open Sans';
  font-size: 21px;
  cursor: pointer;
}
.Fab .text:before { 
  content: ''; 
  display: inline-block; 
  height: 100%; 
  vertical-align: middle; }
</style>