import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        dispimg: undefined
    },
    getters: {
        displayImage: state => {
            return state.dispimg
        }
    },
    mutations: {
        displayImage: (state, img) => {
            state.dispimg = img
        }
    }
})

export default store