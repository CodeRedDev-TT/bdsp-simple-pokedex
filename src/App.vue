<template>
  <router-view/>
</template>

<style>

</style>


<script>
// @ is an alias to /src

import Pokedex from "./core/pokedex";

export default {
  name: 'Home',
  components: {},
  created() {
    if(this.$store.getters["pokemon"].length < 493)
      Pokedex.GetPokemon();
  }
}
</script>
