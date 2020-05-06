import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        origImg: undefined
    },

    getters: {
        origImage: state => {
            return state.origImg
        }
    },
    
    mutations: {
        origImage: (state, img) => {
            state.origImg = img
        }
    }
})

export default store