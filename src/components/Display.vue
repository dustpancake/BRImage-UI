<template>
    <div>
        <v-row justify="center" class="ma-2">

            <v-btn
                icon
                ref="orig"
                :disabled="origButton.disabled"
                :loading="origButton.loading"
                :input-value="!origButton.disabled"
                @click="onOrigButton"
            >
                <v-icon>mdi-record</v-icon>
            </v-btn>

            <v-btn
                icon
                ref="brim"
                :disabled="brimButton.disabled"
                :loading="brimButton.loading"
                :input-value="!brimButton.disabled"
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
                disabled: false,
                loading: false
            },
            brimButton: {
                disabled: true,
                loading: false
            }
        }
    },

    computed: {
        img() {
            return this.$store.getters.origImage
        },
    },

    methods: {
        onFileClick() {
            this.$refs.fupload.click()
        },

        onFileChange() {
            const files = this.$refs.fupload.files
            if(files.length > 0) {
                this.$store.commit('origFile',files[0])
            }
            //Track.track('onFile');
        },

        onOrigButton() {
            console.log('orig')
        },

        onBrimButton() {
            console.log('orig')
        }
    }
}
</script>