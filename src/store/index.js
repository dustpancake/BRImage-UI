import Vue from 'vue'
import Vuex from 'vuex'
import Image from '../utils/image'

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        origFile: undefined,
        origImg: undefined,
        brimImg: undefined,
        dispImg: undefined,

        processing: false,

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
        dispImage: state => {
            return state.dispImg
        },
        isOrigVisible: state => {
            return state.dispImg == state.origImg
        },
        isBrimVisible: state => {
            return state.dispImg == state.brimImg
        },

        isProcessing: state => {
            return state.processing
        },

        brimLibrary: state => {
            return state.brimLib.reverse()
        }
    },

    mutations: {
        origFile: (state, file) => {
            state.origFile = file
            Image.readLocalImage(file)
            .then(image => {
                console.log('origFile')
                state.origImg = image
                state.dispImg = image
            });
        },
        origImage: (state, img) => {
            console.log('origImage')
            state.origImg = img
            state.dispImg = img
        },
        brimImage: (state, img) => {
            console.log('brimImage')
            state.brimImg = img
            state.brimLib.push(img)
            state.dispImg = img
        },

        displayOrig: state => {
            state.dispImg = state.origImg
        },
        displayBrim: state => {
            state.dispImg = state.brimImg
        },

        startProcessing: state => {
            state.processing = true
        },
        stopProcessing: state => {
            state.processing = false
        }

    }
})

export default store