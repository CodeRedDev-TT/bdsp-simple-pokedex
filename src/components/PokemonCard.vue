<template>
  <div class="pokemon" :style="{'background-color': cardColor}">
    <img v-if="isCaptured" class="is-captured" src="https://purepng.com/public/uploads/large/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258617bdog.png" alt="">

    <div class="img-container">
      <img :src="sprite" alt="">
    </div>
    <div class="info">
      <span class="number">#{{ id.toString().padStart(3, '0') }}</span>
      <h3 class="name">{{ name }}</h3>
      <small class="type">Type: <span>{{ type }}</span> </small>
    </div>
  </div>
</template>

<script>
import Pokedex from "../core/pokedex";
export default {
  name: "PokemonCard",
  props:["id", "name", "type", "sprite", "isCaptured"],
  data() {
    return {
      bg: "transparent"
    }
  },
  computed: {
    cardColor(){
      return Pokedex.CardColor(this.type)
    }
  }
}
</script>

<style scoped>

</style>