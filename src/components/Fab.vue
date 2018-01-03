<template>
  <div class="Fab"
    @mouseover="()=>{}"
    @mouseout="()=>{}"
    @mousedown="()=>{}"
    @click="handleClick"
  >
    <div class="imgContainer"><img src="../assets/fab.png" ></div>
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Fab',
    props: ['click', 'text'],
    data() {
      return {}
    },
    computed: {},
    mounted() {},
    methods: {
      handleClick() {
        this.click && this.click()
      }
    }
  }
</script>

<style>
.Fab {
  position: relative;
  height: 49px;
  box-shadow: 
    0px 5px 6px -3px rgba(0, 0, 0, 0.2),
    0px 9px 12px 1px rgba(0, 0, 0, 0.14),
    0px 3px 16px 2px rgba(0, 0, 0, 0.12);
  user-select: none;
  z-index: 1;
  background-color: #909090;
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
  transition: opacity 200ms ease; 
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
.Fab .imgContainer {
  overflow: hidden;
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