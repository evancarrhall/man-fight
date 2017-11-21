<template>
  <div class="Fight">
    <transition appear name="fade">
      <FightHero v-if="isFighting" :hero="heroes[0]" />
    </transition>
    <div class="center"></div>
    <transition appear name="fade">
      <FightHero v-if="isFighting" :hero="heroes[1]" />
    </transition>
  </div>
</template>

<script>
  import FightHero from './FightHero'
  export default {
    name: 'Fight',
    components: {FightHero},
    props: ['heroes', 'isFighting'],
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
.Fight {
  position: absolute;
  z-index: 6;
  display: flex;
}
.Fight .center {
  width: 200px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>