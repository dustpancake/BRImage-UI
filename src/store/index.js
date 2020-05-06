import Vue from 'vue'
import Vuex from 'vuex'
import Image from '../utils/image'

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        origFile: undefined,
        origImg: undefined,
        brimImg: undefined,

        brimLib: []
    },

    getters: {
        origFile: state => {
            return state.origFile
        },
        origImage: state => {
            return state.origImg
        },
        brimImage: state => {
            return state.brimImg
        },

        brimLibrary: state => {
            return state.brimLib
        }
    },

    mutations: {
        origFile: (state, file) => {
            state.origFile = file
            Image.readLocalImage(file)
            .then(image => {
                state.origImg = image
            });
        },
        origImage: (state, img) => {
            state.origImg = img
        },
        brimImage: (state, img) => {
            state.brimImg = img
            state.brimLib.push(img)
        }

    }
})

export default store