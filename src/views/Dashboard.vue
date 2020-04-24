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
          >
          </v-text-field >
          <v-file-input
            label="file input"
            placeholder="Click to select your Image"
            outlined
            dense
            class="mx-2"
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
      rest.postUriToFm(this.img, this.getParams())
        .then(res => {
          console.log(`onProcess: ${res.len}`);
          if(res.len > 0) {
            this.img = res.uri
          }
          else {
            this.retryFmUri(res.uri,1);
          }
        })
        .catch(err => {
          console.log(`onProcess: ${err}`);
        });
      //rest.test("https://brimage-bucket.s3-eu-west-1.amazonaws.com/glitches/4EkJE4DXbtCoul9TMoSZAQ.jpg");
      //rest.test("https://www.newstatesman.com/sites/default/files/styles/lead_image/public/Longreads_2019/09/2019_39_patti_smith.jpg?itok=lBw3de4S");
      //rest.test("http://www.stjamestaunton.co.uk/");
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