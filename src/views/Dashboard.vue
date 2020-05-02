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
            label="http image input" 
            placeholder="Paste your http or https address"
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
            label="file image input"
            placeholder="Click to select your own image"
            outlined
            dense
            class="mx-2"
            accept="image/*"
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
            :rules="[onOmegaRules]"
            validate-on-blur
            maxlength="5"
        ></v-text-field>    
        <v-text-field
            :label="fmParams ? fmParams.phase.name : ''"
            :placeholder="fmParams ? fmParams.phase.default.toString() : ''"
            outlined
            :hint="fmParams ? fmParams.phase.help : ''"
            v-model="phase"
            :rules="[onPhaseRules]"
            validate-on-blur
            maxlength="5"
        ></v-text-field> 
        <v-text-field
            :label="fmParams ? fmParams.lowpass.name : ''"
            :placeholder="fmParams ? fmParams.lowpass.default.toString() : ''"
            outlined
            :hint="fmParams ? fmParams.lowpass.help : ''"
            v-model="lowpass"
            :rules="[onLowpassRules]"
            validate-on-blur
            maxlength="5"
        ></v-text-field> 
        <v-text-field
            :label="fmParams ? fmParams.pquantize.name : ''"
            :placeholder="fmParams ? fmParams.pquantize.default.toString() : ''"
            outlined
            :hint="fmParams ? fmParams.pquantize.help : ''"
            v-model="pquantize"
            :rules="[onPquantizeRules]"
            validate-on-blur
            maxlength="1"
        ></v-text-field> 
        <v-btn class="mx-1 mt-1" @click="onRandom">
          <span>Random</span>
          <v-icon right dark>autorenew</v-icon>
        </v-btn>
        <v-btn class="mx-1 mt-1" @click="onProcess">
          <span>Process</span>
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
        <v-btn class="mx-1 mt-1" @click="onSave">
          <span>Save</span>
          <v-icon right dark>mdi-cloud-download</v-icon>
        </v-btn>        
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
const rest = require('../utils/rest');
const image = require('../utils/image');
const check = require('../utils/check');

const URI = require('urijs');

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
      this.url = undefined;
      this.file = undefined;
      this.img = image.getRandom();
      this.track('onRandom');
    },
    onProcess() {
      if(this.img) {
        if(this.img.startsWith('data:')) {
          console.log('data');
          image.compressFile(this.file)
          .then(compressedFile => {
            return rest.putImageStore(compressedFile);
          })
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
      this.track('onProcess');
    },
    onFile(files) {
      console.log(`onFile=${this.file}`);
      if(this.file) {
        image.readLocalImage(this.file)
          .then(image => {
            this.img = image;
          }); 
      }
      this.track('onFile');
    },
    onUrl(url) {
      console.log(`onUrl=${this.url}`);
      if(url && check.checkUrl(url)) {
        console.log("here");
        this.img = this.url;
      }
      this.track('onUrl');
    },
    onSave() {
      console.log(`onSave=${this.img}`);
      const url = new URI(this.img);
      //rest.saveImg('https://brimage-bucket.s3-eu-west-1.amazonaws.com/glitches/0Pq0Z5Z1uXsXe2ZosfJA.jpg');
      rest.saveImg(this.img,url.filename());
      this.track('onSave');
    },
    onUrlRules(input) {
      return check.checkUrl(input);
    },
    onOmegaRules(input) {
      console.log(input);
      if(this.fmParams){
        this.track('onOmega');
        return check.checkOmega(input,this.fmParams.omega);
      }
      return true;
    },
    onPhaseRules(input) {
      console.log(input);
      if(this.fmParams){
        this.track('onPhase');
        return check.checkPhase(input,this.fmParams.phase);
      }
      return true;
    },
    onLowpassRules(input) {
      console.log(input);
      if(this.fmParams){
        this.track('onLowpass');
        return check.checkLowpass(input,this.fmParams.lowpass);
      }
      return true;
    },
    onPquantizeRules(input) {
      console.log(input);
      if(this.fmParams){
        this.track('onPquantize');
        return check.checkPquantize(input,this.fmParams.pquantize);
      }
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
                this.time(cnt);
              }
              else {
                console.log('Retry still not ready');
                this.retryFmUri(uri,cnt+1);
              }
            })
            .catch(err => {
              console.log(`retryFmUri error=${err}`);
            })
        }, 500);
      }
      else {
        console.log('retryFmUri - giving up');
        this.time(cnt);
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
        omega: this.omega && check.checkOmega(this.omega,this.fmParams.omega) ? this.omega : this.fmParams.omega.default.toString(),
        phase: this.phase && check.checkPhase(this.phase,this.fmParams.phase) ? this.phase : this.fmParams.phase.default.toString(),
        lowpass: this.lowpass && check.checkLowpass(this.lowpass,this.fmParams.lowpass) ? this.lowpass : this.fmParams.lowpass.default.toString(),
        pquantize: this.pquantize && check.checkPquantize(this.pquantize,this.fmParams.pquantize) ? this.pquantize : this.fmParams.pquantize.default.toString()
      };
    },
    track(label) {
        this.$gtag.event('select_content', {
          'event_category': 'engagement',
          'event_label': label,
          'value': 1
        });
    },
    time(count) {
      this.$gtag.time({
        'name' : 'loadFM',
        'value' : (count * 500),
        'event_category' : 'backend_process'
      })
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