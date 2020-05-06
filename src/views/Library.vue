<template>

    <v-container>

        <h1 class="grey--text text-center">Temporary Library</h1>

        <v-layout row wrap>

            <v-flex xs12 sm6 md6 lg3 v-for="u in urls" :key="u">
                <v-card class="text-center ma-3">
                    <v-responsive class="pt-4">
                        <v-avatar tile size="260" class="grey lighten-2">
                            <v-img :src="u"></v-img>
                        </v-avatar>
                    </v-responsive>
                    <v-btn icon color="light-grey">
                        <v-icon center>cloud_download</v-icon>
                    </v-btn>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>

</template>

<script>
export default {

    computed: {
        urls() {
            return this.$store.getters.brimLibrary
        }
    }
}
</script>