<template>
    <v-row justify="center" no-gutters class="my-2">

      <v-btn
        class="ma-2" 
        small
        :disabled="isEnabled"
        @click="onSave"
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
        :disabled="isEnabled"
        @click="onReset"
      >
        reset
      </v-btn>

    </v-row>
</template>

<script>
//import Track from '../utils/track';
import URI from 'urijs';

export default {
    
    name: 'Triggers',

    computed: {
        isEnabled() {
            return this.$store.getters.brimImage == null
        }
    },

    methods: {
        onProcess() {
            this.$store.dispatch('resetInputCols')
            this.$store.dispatch('doFm')
        },

        onSave() {
            const url = new URI(this.$store.getters.brimImage);
            window.open(url, "_blank");
            //Track.track('onSave');
        },

        onReset() {
            this.$store.dispatch('resetInputCols')
            this.$store.dispatch('resetBrimImage')
        }
    }
}
</script>