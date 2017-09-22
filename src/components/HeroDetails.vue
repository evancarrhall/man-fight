<template>
  <ul>
    <li v-if="hero" v-for="(attr, index) in hero">{{index + ": " + attr}}</li>
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
<style>
  ul {
    list-style: none;
    margin: 10px;
  }
</style>