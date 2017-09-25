<template>
  <ul v-if="hero">
    <li v-for="(attr, index) in hero" :key="index">{{index + ": " + attr}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'HeroDetails',
    props: ['hero'],
    data() {
      return {}
    },
    computed: {
    },
    mounted() {},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    list-style: none;
    margin: 10px;
  }
  li {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 10px;
    opacity: 0.2;
  }
</style>