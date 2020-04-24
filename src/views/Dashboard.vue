<template>
  <v-container>
    <v-row>

      <v-col
        cols="12"
        md="8"
      >
          <v-img
            :src="img"
            height="500"
            class="grey darken-4"
          >
          </v-img>
          <v-text-field 
            label="image input" 
            placeholder="Type to enter your URL"
            outlined 
            dense
            prepend-icon="add_a_photo"
            class="mt-4 mx-2"
            v-model="url"
            @change="onUrl"
            :rules="[onUrlRules]"
          >
          </v-text-field >
          <v-file-input
            label="file input"
            placeholder="Click to select your Image"
            outlined
            dense
            class="mx-2"
            v-model="file"
            @change="onFile"
          >
          </v-file-input>
      </v-col>

      <v-col
        cols="6"
        md="4"
      >
        <v-text-field class="pt-2"
            :label="fmParams ? fmParams.omega.name : ''"
            :placeholder="fmParams ? fmParams.omega.default.toString() : ''"
            outlined
            :hint="fmParams ? fmParams.omega.help : ''"
            v-model="omega"
        ></v-text-field>    
        <v-text-field
            :label="fmParams ? fmParams.phase.name : ''"
            :placeholder="fmParams ? fmParams.phase.default.toString() : ''"
            outlined
            :hint="fmParams ? fmParams.phase.help : ''"
            v-model="phase"
        ></v-text-field> 
        <v-text-field
            :label="fmParams ? fmParams.lowpass.name : ''"
            :placeholder="fmParams ? fmParams.lowpass.default.toString() : ''"
            outlined
            :hint="fmParams ? fmParams.lowpass.help : ''"
            v-model="lowpass"
        ></v-text-field> 
        <v-text-field
            :label="fmParams ? fmParams.pquantize.name : ''"
            :placeholder="fmParams ? fmParams.pquantize.default.toString() : ''"
            outlined
            :hint="fmParams ? fmParams.pquantize.help : ''"
            v-model="pquantize"
        ></v-text-field> 
        <v-btn class="mx-1" @click="onRandom">
          <span>Random</span>
          <v-icon right dark>autorenew</v-icon>
        </v-btn>
        <v-btn class="mx-1" @click="onProcess">
          <span>Process</span>
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
const rest = require('../utils/rest');
const image = require('../utils/image');

export default {
  name: 'Dashboard',

  data() {
    return {
      img: image.getRandom(),
      url: undefined,
      file: undefined,
      omega: undefined,
      phase: undefined,
      lowpass: undefined,
      pquantize: undefined,
      fmParams: undefined
    }
  },

  methods: {
    onRandom() {
      this.img = image.getRandom();
    },
    onProcess() {
      if(this.img) {
        if(this.img.startsWith('data:')) {
          console.log('data');
          rest.putImageStore(this.file)
            .then(url => {
              return this.doPostFm(url);
            })
            .catch(err => {
              console.log(`onProcess file error=${err}`);
            });
        }
        else {
          console.log('url');
          this.doPostFm(this.img);
        }
      }
    },
    onFile(files) {
      console.log(`onFile=${this.file}`);
      if(this.file) {
        image.readLocalImage(this.file)
          .then(image => {
            this.img = image;
          }); 
      }
    },
    onUrl(url) {
      console.log(`onUrl=${this.url}`);
      if(this.url.startsWith('http')) {
        this.img = this.url;
      }
    },
    onUrlRules(input) {
      console.log(input);
      return true;
    },
    retryFmUri(uri,cnt) {
      console.log(`retries=${cnt}`);
      if(cnt <= 20) {
        setTimeout(() => {
          rest.isFmReady(uri)
            .then(ret => {
              console.log(`onProcessRetry: ${ret.len}`);
              if(ret.len > 0) {
                this.img = ret.uri;
              }
              else {
                console.log('Retry still not ready');
                this.retryFmUri(uri,cnt+1);
              }
            })
            .catch(err => {
              console.log(`retryFrmUri error=${err}`);
            })
        }, 500);
      }
    },
    doPostFm(uri) {
      rest.postUriToFm(uri, this.getParams())
        .then(res => {
          console.log(`doPostFm: ${res.len}`);
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
    getParams() {
      return {
        omega: this.omega ? this.omega : this.fmParams.omega.default.toString(),
        phase: this.phase ? this.phase : this.fmParams.phase.default.toString(),
        lowpass: this.lowpass ? this.lowpass : this.fmParams.lowpass.default.toString(),
        pquantize: this.pquantize ? this.pquantize : this.fmParams.pquantize.default.toString()
      };
    }
  },

  beforeCreate: function() {
    rest.getFmParams()
      .then(params => {
        this.fmParams = params;
      });
  }

}
</script>