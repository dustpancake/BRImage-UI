<template>
    <v-row justify="center" no-gutters class="my-2">

      <v-btn
        class="ma-2" 
        small
      >
        save
      </v-btn>

      <v-btn 
        x-large
        @click="onProcess"
      >
        process
      </v-btn>

      <v-btn 
        small
        class="ma-2" 
      >
        reset
      </v-btn>

    </v-row>
</template>

<script>
import Image from '../utils/image';
import Rest from '../utils/rest';
import Track from '../utils/track';
import URI from 'urijs';

export default {
    
    name: 'Triggers',
    data() {
        return {
            img:'TODO'
        }
    },

    methods: {
        onProcess() {
            const img = this.$store.getters.origImage
            if(img.startsWith('data:')) {
                Image.compressFile(this.$store.getters.origFile)
                .then(compressedFile => {
                    return Rest.putImageStore(compressedFile);
                })
                .then(url => {
                    return this.doPostFm(url);
                })
                .catch(err => {
                    console.log(`onProcess file error=${err}`);
                });
            }
            else {
                //this.doPostFm(img);
                console.log(new URI(img))
            }
            //Track.track('onProcess');
        },

        onSave() {
            const url = new URI(this.img);
            window.open(url, "_blank");
            Track.track('onSave');
        },

        doPostFm(uri) {
            const temp = {
                omega: '0.04',
                phase: '0.1',
                lowpass: '0.25',
                pquantize: '3'
            }
            Rest.postUriToFm(uri, temp)
                .then(res => {
                    if(res.len > 0) {
                        this.img = res.uri
                    }
                    else {
                        this.retryFmUri(res.uri,1);
                    }
                })
                .catch(err => {
                    console.log(`doPostFm: ${err}`);
                });
        },

        retryFmUri(uri,cnt) {
            if(cnt <= 20) {
                setTimeout(() => {
                Rest.isFmReady(uri)
                    .then(ret => {
                    console.log(`onProcessRetry: ${ret.len}`);
                    if(ret.len > 0) {
                        this.$store.commit('brimImage',ret.uri)
                        //this.time(cnt);
                    }
                    else {
                        console.log('Retry still not ready');
                        this.retryFmUri(uri,cnt+1);
                    }
                    })
                    .catch(err => {
                    console.log(`retryFmUri error=${err}`);
                    })
                }, cnt == 1 ? 1200 : 300);
            }
            else {
                console.log('retryFmUri - giving up');
                //Track.time(cnt);
            }
        }
    }
}
</script>