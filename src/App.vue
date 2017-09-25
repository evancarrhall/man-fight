<template>
  <div id="app">
    <Game />
  </div>
</template>

<script>
import Game from './components/Game'

export default {
  name: 'app',
  components: {
    Game
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

#app {
  height: 100%;
}
</style>
