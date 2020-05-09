<template>
    <v-row justify="center">

      <v-col cols="3">
        <v-text-field
            :label="fmParams ? fmParams.omega.name : ''"
            :placeholder="fmParams ? fmParams.omega.default.toString() : ''"
            outlined
            :hint="fmParams ? fmParams.omega.help : ''"
            v-model="omega"
            :rules="[onOmegaRules]"
            validate-on-blur
            maxlength="5"
        ></v-text-field>    
      </v-col>

      <v-col cols="3">
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
      </v-col>

      <v-col cols="3">
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
      </v-col>

      <v-col cols="3">
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
      </v-col>

    </v-row>

</template>

<script>
import Rest from '../utils/rest';
import Check from '../utils/check';
//import Track from '../utils/track';

export default {

    name: 'FmInput',
    data() {
      return {
        omega: undefined,
        phase: undefined,
        lowpass: undefined,
        pquantize: undefined,
        fmParams: undefined       
      }
    },

    methods: {
      getParams() {
        return {
          omega: this.omega && Check.checkOmega(this.omega,this.fmParams.omega) ? this.omega : this.fmParams.omega.default.toString(),
          phase: this.phase && Check.checkPhase(this.phase,this.fmParams.phase) ? this.phase : this.fmParams.phase.default.toString(),
          lowpass: this.lowpass && Check.checkLowpass(this.lowpass,this.fmParams.lowpass) ? this.lowpass : this.fmParams.lowpass.default.toString(),
          pquantize: this.pquantize && Check.checkPquantize(this.pquantize,this.fmParams.pquantize) ? this.pquantize : this.fmParams.pquantize.default.toString()
        };
      },

      onOmegaRules(input) {
        if(this.fmParams){
          //Track.track('onOmega');
          return Check.checkOmega(input,this.fmParams.omega);
        }
        return true;
      },
      onPhaseRules(input) {
        if(this.fmParams){
          //Track.track('onPhase');
          return Check.checkPhase(input,this.fmParams.phase);
        }
        return true;
      },
      onLowpassRules(input) {
        if(this.fmParams){
          //Track.track('onLowpass');
          return Check.checkLowpass(input,this.fmParams.lowpass);
        }
        return true;
      },
      onPquantizeRules(input) {
        if(this.fmParams){
          //Track.track('onPquantize');
          return Check.checkPquantize(input,this.fmParams.pquantize);
        }
        return true;
      }
    },

    beforeCreate: function() {
      Rest.getFmParams()
        .then(params => {
          this.fmParams = params;
        });
    }
}
</script>