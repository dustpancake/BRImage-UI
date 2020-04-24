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
      rest.postUriToFm(this.img, this.getParams());
    },
    getParams() {
      return {
        omega: this.omega ? parseFloat(this.omega) : this.fmParams.omega.default,
        phase: this.phase ? parseFloat(this.phase) : this.fmParams.phase.default,
        lowpass: this.lowpass ? parseFloat(this.lowpass) : this.fmParams.lowpass.default,
        pquantize: this.pquantize ? parseFloat(this.pquantize) : this.fmParams.pquantize.default
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