import ApiService from "./services/api-service";
import store from "../store";


const COLORS = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}
const MODIFY_EVO_ID = (pokemon, evoId, identifier) => {
    for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i]["url"] === identifier) {
            pokemon[i]["evo_id"] = evoId;
            break;
        }
    }
}
const FIND_EVOLUTIONS = (pokemon, evoChainId, evolvesTo) => {
    for (let i = 0; i < evolvesTo.length; i++) {
        let obj = evolvesTo[i];
        MODIFY_EVO_ID(pokemon, evoChainId, obj["species"]["url"]);
        if (obj["evolves_to"].length > 0) {
            FIND_EVOLUTIONS(pokemon, evoChainId, obj["evolves_to"])
        }
    }
}
const SORT_EVOLUTION_CHAIN = (pokemon, chain, evoChainId) => {
    let root = chain["species"];
    MODIFY_EVO_ID(pokemon, evoChainId, root["url"]);
    if (chain["evolves_to"]) {
        FIND_EVOLUTIONS(pokemon, evoChainId, chain["evolves_to"]);
    }
}

class Pokedex {
    // initially used this to fetch data from api.
    /*static GetPokemon = async () => {
        if (store.getters["pokemon"].length < 493) {
            let gen1 = await ApiService.GenerateGetRequest("generation/1");
            let gen2 = /!*{pokemon_species: []};*!/ await ApiService.GenerateGetRequest("generation/2");
            let gen3 = /!*{pokemon_species: []};*!/await ApiService.GenerateGetRequest("generation/3");
            let gen4 =/!* {pokemon_species: []};*!/await ApiService.GenerateGetRequest("generation/4");

            let pokemon = [];
            let pokemonSpeciesKey = "pokemon_species";
            pokemon = pokemon.concat(gen1[pokemonSpeciesKey], gen2[pokemonSpeciesKey], gen3[pokemonSpeciesKey], gen4[pokemonSpeciesKey]);


            let evoChainID = 1;
            for (let i = 0; i < pokemon.length; i++) {
                let obj = pokemon[i];
                let url = obj.url.replace("https://pokeapi.co/api/v2/", "");

                // fetch dex id - pokemon-species
                const speciesInfo = await ApiService.GenerateGetRequest(url);
                const dexId = speciesInfo["id"];
                obj["dex_id"] = dexId;

                // fetch image using dexid
                const monInfo = await ApiService.GenerateGetRequest(`pokemon/${dexId}/`);
                obj.type = monInfo["types"][0]["type"]["name"];
                const sprites = monInfo["sprites"];
                if (sprites["front_default"])
                    obj.sprite = sprites["front_default"]
                else
                    obj.sprite = "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700"


                // fetch evolution chain
                if (speciesInfo["evolution_chain"]) {
                    url = speciesInfo["evolution_chain"]["url"].replace("https://pokeapi.co/api/v2/", "");
                    const evolutionChain = await ApiService.GenerateGetRequest(url);

                    if (evolutionChain["chain"]) {
                        let chain = evolutionChain["chain"];
                        SORT_EVOLUTION_CHAIN(pokemon, chain, evoChainID);
                        evoChainID++;
                    }
                }
            }
            store.commit("updatePokemonList", {pokemon});
            console.log("api");
            return pokemon.sort((a, b)=>{

                if (a.dex_id < b.dex_id) {
                    return -1;
                }
                if (a.dex_id > b.dex_id) {
                    return 1;
                }

                return 0;
            });
        }

        return store.getters["pokemon"].sort((a, b)=>{

            if (a.dex_id < b.dex_id) {
                return -1;
            }
            if (a.dex_id > b.dex_id) {
                return 1;
            }

            return 0;
        });
    }*/
    // todo make private
    static GetPokemon = async () => {
        if (store.getters["pokemon"].length < 493) {
            let pokemon = await ApiService.GenerateGetRequest("http://localhost/pokedex/bdsp.php", {}, false);
            pokemon = pokemon.sort((a, b) => {
                if (a["dex_id"] < b["dex_id"]) {
                    return -1;
                }
                if (a["dex_id"] > b["dex_id"]) {
                    return 1;
                }
                return 0;
            });

            store.commit("updatePokemonList", {pokemon});
            store.commit("registerCaptures", {pokemon});
            return pokemon;
        }
        return store.getters["pokemon"];
    }
    static Pokemon = () => {
        return store.getters["pokemon"];
    }

    static CardColor = (type) => {
        return COLORS[type];
    }
}

export default Pokedex