<template>
  <h1 v-if="!isSearching">Pokedex</h1>
  <h1 v-else><input v-model="searchVal" @keyup="searchChanged" ref="searchInput" type="text"></h1>
  <div class="poke-container" id="poke-container">
    <pokemon-card @click.prevent="pokemonCardTapped(mon)" v-for="mon in pokemonFilter" :isCaptured="$store.getters['captured'][mon['dex_id']]" :id="mon.dex_id" :name="mon.name" :type="mon.type" :sprite="mon.sprite"/>
  </div>

  <div class="wrapper">
    <div class="phone">

      <nav class="nav nav--icons">
        <ul>
          <li style="visibility: hidden">
            <a href="#home">
              <svg class="icon icon-home" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor"
                      d="M21.6 8.2l-9-7c-0.4-0.3-0.9-0.3-1.2 0l-9 7c-0.3 0.2-0.4 0.5-0.4 0.8v11c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-11c0-0.3-0.1-0.6-0.4-0.8zM14 21h-4v-8h4v8zM20 20c0 0.6-0.4 1-1 1h-3v-9c0-0.6-0.4-1-1-1h-6c-0.6 0-1 0.4-1 1v9h-3c-0.6 0-1-0.4-1-1v-10.5l8-6.2 8 6.2v10.5z"></path>
              </svg>
              <span>Home</span>
            </a>
          </li>
          <li style="visibility: hidden">

            <a href="#home">
              <svg class="icon icon-home" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor"
                      d="M21.6 8.2l-9-7c-0.4-0.3-0.9-0.3-1.2 0l-9 7c-0.3 0.2-0.4 0.5-0.4 0.8v11c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-11c0-0.3-0.1-0.6-0.4-0.8zM14 21h-4v-8h4v8zM20 20c0 0.6-0.4 1-1 1h-3v-9c0-0.6-0.4-1-1-1h-6c-0.6 0-1 0.4-1 1v9h-3c-0.6 0-1-0.4-1-1v-10.5l8-6.2 8 6.2v10.5z"></path>
              </svg>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#search" @click.prevent="onSearchClicked">
              <svg v-if="!isSearching" class="icon icon-search" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor"
                      d="M21.7 20.3l-3.7-3.7c1.2-1.5 2-3.5 2-5.6 0-5-4-9-9-9s-9 4-9 9c0 5 4 9 9 9 2.1 0 4.1-0.7 5.6-2l3.7 3.7c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4zM4 11c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-0.8 3.7-2 4.9 0 0 0 0 0 0s0 0 0 0c-1.3 1.3-3 2-4.9 2-4 0.1-7.1-3-7.1-6.9z"></path>
              </svg>
              <svg v-else class="icon icon-search" viewBox="0 0 24 24" width="24" height="24">
                <path  fill="currentColor" d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
              </svg>
              <span>{{ isSearching ? 'Cancel' : 'Search' }}</span>
            </a>
          </li>
          <li style="visibility: hidden">

            <a href="#profile">
              <svg class="icon icon-profile" viewBox="0 0 24 24" width="24" height="24">
                <g fill="currentColor">
                  <path
                      d="M16 14h-8c-2.8 0-5 2.2-5 5v2c0 0.6 0.4 1 1 1s1-0.4 1-1v-2c0-1.7 1.3-3 3-3h8c1.7 0 3 1.3 3 3v2c0 0.6 0.4 1 1 1s1-0.4 1-1v-2c0-2.8-2.2-5-5-5z"></path>
                  <path
                      d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zM12 4c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z"></path>
                </g>
              </svg>
              <span>Profile</span>
            </a>
          </li>
          <li style="visibility: hidden">

            <a href="#search">
              <svg class="icon icon-search" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor"
                      d="M21.7 20.3l-3.7-3.7c1.2-1.5 2-3.5 2-5.6 0-5-4-9-9-9s-9 4-9 9c0 5 4 9 9 9 2.1 0 4.1-0.7 5.6-2l3.7 3.7c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4zM4 11c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-0.8 3.7-2 4.9 0 0 0 0 0 0s0 0 0 0c-1.3 1.3-3 2-4.9 2-4 0.1-7.1-3-7.1-6.9z"></path>
              </svg>
              <span>Search</span>
            </a>
          </li>
        </ul>
      </nav>

    </div>
  </div>
</template>
<style>

@import url('https://fonts.googleapis.com/css?family=Lato:300,400&display=swap');

* {
  box-sizing: border-box;
}

body {
  background: #efefbb;
  background: linear-gradient(to right, #d4d3dd, #efefbb);
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
}

h1 {
  letter-spacing: 3px;
  text-align: center;
}

.poke-container {
  display: flex;
  flex-wrap: wrap;
  /*align-items: space-between;*/
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto 100px;
}

.pokemon {
  background-color: #eee;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(100, 100, 100, 0.5);
  margin: 10px;
  padding: 20px;
  text-align: center;
  position: relative;
}

.pokemon .is-captured{
  position: absolute;
  width: 30px;
  height: 30px;
  top: 0;
  left: 0;
}

.pokemon .img-container {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  text-align: center;
}



.pokemon .img-container img {
  max-width: 90%;
  margin-top: 20px;
}

.pokemon .info {
  margin-top: 20px;
}

.pokemon .info .number {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 0.8em;
}

.pokemon .info .name {
  margin: 15px 0 7px;
  letter-spacing: 1px;
}


.wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to right, #d4d3dd, #efefbb);
}

.phone {
  border: 2px solid #eee;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100px;
  box-shadow: 0 40px 80px rgb(0 0 0 / 15%);
}

.nav--icons {
  position: absolute;
  bottom: 2em;
  left: 1em;
  right: 1em;
}

.nav--icons ul {
  list-style-type: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 0;
  margin: 0;
}

.nav--icons ul li a {
  font-family: sans-serif;
  font-size: 11px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #000;
  line-height: 1;
  vertical-align: middle;
  display: flex;
  align-items: center;
  border-radius: 3em;
  padding: 0.75em 1.25em;
  transition: 0.6s ease-in-out;
}

.nav--icons ul li a span {
  display: inline-block;
  overflow: hidden;
  max-width: 0;
  opacity: 0;
  padding-left: 0.5em;
  transform: translate3d(-0.5em, 0, 0);
  transition: opacity 0.6s, max-width 0.6s, transform 0.6s;
  transition-timing-function: ease-in-out;
}

.nav--icons ul li a:hover,
.nav--icons ul li a.is-active {
  color: #fff;
  background-color: #000;
}

.nav--icons ul li a:hover span,
.nav--icons ul li a.is-active span {
  opacity: 1;
  max-width: 50px;
  transform: translate3d(0, 0, 0);
}

</style>
<script>
// @ is an alias to /src
import Pokedex from "../core/pokedex";
import PokemonCard from "../components/PokemonCard";
import ApiService from "../core/services/api-service";

export default {
  name: 'Home',
  components: {
    PokemonCard
  },
  data() {
    return {
      isSearching : false,
      filterByEvoId: null,
      searchVal:"",
      pokemon: [],
    }
  },
  computed:{
    pokemonFilter(){
      if(this.searchVal === ""){
        return this.pokemon;
      }else if(!this.filterByEvoId){
        return this.pokemon.filter((mon)=>{
          return mon.name.toLowerCase().indexOf(this.searchVal.toLowerCase()) > -1;
        });
      }else if(this.filterByEvoId){
        return this.pokemon.filter((mon)=>{
          return mon.evo_id === this.filterByEvoId;
        });
      }
    }
  },
  async created() {

    this.pokemon = Pokedex.Pokemon();
    const unsubscribe = this.$store.subscribe((mutation, state) => {
      this.pokemon = Pokedex.Pokemon();
      unsubscribe();
    }, this.$store.getters["pokemon"]);
  },
  methods:{
    onSearchClicked(){
      this.searchVal = "";
      this.filterByEvoId = null;
      this.isSearching = !this.isSearching;
      this.$nextTick(()=>{
        if(this.isSearching)
          this.$refs.searchInput.focus();
      })
    },
    pokemonCardTapped(pokemon){
      if(this.isSearching && !this.filterByEvoId){
        this.filterByEvoId = pokemon.evo_id;
      }else if(!this.isSearching || (this.isSearching && this.filterByEvoId)){
        let captureStats =  this.$store.getters["captured"][pokemon["dex_id"]];

        if(confirm("Are you sure you want to " + (captureStats ? "Release" : "Capture") + "?")){
          this.$store.commit("setCaptureStatus", {dex_id :pokemon["dex_id"], isCaptured: !captureStats});
        }
      }
    },
    searchChanged(){
      if(this.filterByEvoId)
        this.filterByEvoId = null;
    }
  }
}
</script>
