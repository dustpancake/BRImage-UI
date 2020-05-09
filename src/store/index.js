import Vue from 'vue'
import Vuex from 'vuex'
import Image from '../utils/image'
import Rest from '../utils/rest'

Vue.use(Vuex);

const defaultImg = 'br.jpg'

const store = new Vuex.Store({

    state: {
        origFile: undefined,
        origImg: defaultImg,
        brimImg: undefined,
        dispImg: defaultImg,

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

    actions: {
        setOrigFile: ({commit}, file) => {
            commit('origFile',file)
            Image.readLocalImage(file)
            .then(image => {
                commit('origImage',image)
                commit('dispImage',image)
            })
        },
        setBrimImage: ({commit}, img) => {
            commit('brimImage',img)
            commit('brimLib',img)
            commit('dispImage',img)
        },
        resetBrimImage: ({commit,getters}) => {
            commit('brimImage', undefined)
            commit('dispImage', getters.origImage)
        },

        showBrimImage: ({commit,getters}) => {
            commit('dispImage', getters.brimImage)
        },
        showOrigImage: ({commit,getters}) => {
            commit('dispImage',getters.origImage)
        },

        doFm: ({commit,getters,dispatch}) => {
            commit('startProcessing')
            const img = getters.origImage
            if(Image.isDataImage(img)) {
                Image.compressFile(getters.origFile)
                .then(compressedFile => {
                    return Rest.putImageStore(compressedFile);
                })
                .then(url => {
                    const temp = {//TODO real params
                        omega: '0.04',
                        phase: '0.1',
                        lowpass: '0.25',
                        pquantize: '3'
                    }
                    return Rest.postUriToFm(url, temp)
                        .then(res => {
                            if(res.len > 0) {
                                //transformed image
                                dispatch('setBrimImage',res.uri)
                                commit('stopProcessing')
                            }
                            else {
                                dispatch('redoFm',{uri:res.uri,cnt:1})
                            }
                        })
                        .catch(err => {
                            console.log(`doFm: ${err}`)
                            commit('stopProcessing')
                        });
                })
                .catch(err => {
                    //Todo
                    console.log(`onProcess file error=${err}`);
                });
            }
            else {
                //this.doPostFm(img);
                console.log(img)
            }
        },

        redoFm: ({commit,dispatch},params) => {
            if(params.cnt <= 20) {
                setTimeout(() => {
                    Rest.isFmReady(params.uri)
                    .then(ret => {
                        console.log(`redoFm: ${ret.len}`);
                        if(ret.len > 0) {
                            commit('stopProcessing')
                            dispatch('setBrimImage',ret.uri)
                            //this.time(cnt);
                    }
                    else {
                        console.log('Retry still not ready');
                        params.cnt += 1
                        dispatch('redoFm',params)
                    }
                    })
                    .catch(err => {
                        //TODO
                        console.log(`retryFmUri error=${err}`);
                        //commit('stopProcessing')
                    })
                }, params.cnt == 1 ? 1200 : 300);
            }
            else {
                commit('stopProcessing')
                console.log('retryFmUri - giving up');
                //Track.time(cnt);
            }
        }
    },

    mutations: {
        origFile: (state, file) => {
            state.origFile = file
        },
        origImage: (state,img) => {
            state.origImg = img
        },
        dispImage: (state,img) => {
            state.dispImg = img
        },
        brimImage: (state, img) => {
            state.brimImg = img
        },
        brimLib: (state,img) => {
            state.brimLib.push(img)
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