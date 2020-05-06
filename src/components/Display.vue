<template>
    <div>
        <v-row justify="center" class="ma-2">

            <v-btn
                icon
            >
                <v-icon>mdi-record</v-icon>
            </v-btn>

            <v-btn
                icon
            >
                <v-icon>mdi-record</v-icon>
            </v-btn>
            </v-row>

            <v-row justify="center">

            <v-img
                :src="img"
                max-width="320"
                max-height="300"
                class="grey darken-4"
            >
            </v-img>

            <v-btn
                v-show=true
                fab
                absolute
                right
            >
                <v-icon>mdi-file-image-outline</v-icon>
            </v-btn>

        </v-row>
    </div>
</template>

<script>
/* eslint-disable */
import Image from '../utils/image';
import Track from '../utils/track';

export default {
    name: 'Display',

    data() {
        return {
            file: undefined
        }
    },

    computed: {
        img() {
            return this.$store.getters.displayImage
        },
    },

    methods: {
        onFile(files) {
            if(this.file) {
                Image.readLocalImage(this.file)
                .then(image => {
                    this.img = image;
                }); 
            }
            Track.track('onFile');
        },
    }
}
</script>