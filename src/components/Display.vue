<template>
    <div>
        <v-row justify="center" class="ma-2">

            <v-btn
                icon
                ref="orig"
                @click="onOrigButton"
            >
                <v-icon>mdi-record</v-icon>
            </v-btn>

            <v-btn
                icon
                ref="brim"
                :disabled="disableBrim"
                :loading="isProcessing"
                @click="onBrimButton"
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
                @click="onFileClick"
            >
                <v-icon>mdi-file-image-outline</v-icon>
            </v-btn>

            <input ref="fupload" type="file" hidden @change="onFileChange" accept="image/*" capture="user" />

        </v-row>

    </div>
</template>

<script>
/* eslint-disable */
import Track from '../utils/track';

export default {
    name: 'Display',

    data() {
        return {
            origButton: {
                loading: false
            },
            brimButton: {
                loading: false
            }
        }
    },

    computed: {
        img() {
            return this.$store.getters.dispImage
        },
        disableBrim() {
            return this.$store.getters.brimImage == null
        },
        isProcessing() {
            return this.$store.getters.isProcessing
        }
    },

    methods: {
        onFileClick() {
            this.$refs.fupload.click()
        },

        onFileChange() {
            const files = this.$refs.fupload.files
            if(files.length > 0) {
                this.$store.dispatch('setOrigFile',files[0])
            }
            //Track.track('onFile');
        },

        onOrigButton() {
            this.$store.dispatch('showOrigImage')
        },

        onBrimButton() {
            this.$store.dispatch('showBrimImage')
        }
    }
}
</script>