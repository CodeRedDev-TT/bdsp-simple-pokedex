import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    plugins: [createPersistedState()],
    state: {
        pokemon: [],
        captured: {},
    },
    mutations: {
        updatePokemonList(state, payload) {
            state.pokemon = payload.pokemon
        },
        // just used to initially set capture properties
        registerCaptures(state, payload){
            const {pokemon} = payload;
            for(let i = 0; i < pokemon.length; i++){
                if(!state.captured[pokemon[i]["dex_id"]])
                    state.captured[pokemon[i]["dex_id"]] = false;
            }
        },
        setCaptureStatus(state, payload){
            const {dex_id, isCaptured} = payload;
            state.captured[dex_id] = isCaptured;
        }
    },
    getters: {
        pokemon(state) {
            return state.pokemon;
        },

        captured(state) {
            return state.captured;
        }
    },
    actions: {},
    modules: {}
})
