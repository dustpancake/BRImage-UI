<template>

    <v-container>

        <h1 class="grey--text text-center">Temporary Library</h1>

        <v-layout row wrap>

            <v-flex xs12 sm6 md6 lg3 v-for="p in photos" :key="p.name">
                <v-card class="text-center ma-3">
                    <v-responsive class="pt-4">
                        <v-avatar tile size="260" class="grey lighten-2">
                            <v-img :src="p.url"></v-img>
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
    data() {
        return {
            photos: [
                {name: 'Title of the Picture 1', status: 'processed',url:'https://picsum.photos/350/165?random'},
                {name: 'Title of the Picture 2', status: 'processed',url:'https://picsum.photos/350/165?random'},
                {name: 'Title of the Picture 3', status: 'processed',url:'https://picsum.photos/350/165?random'},
                {name: 'Title of the Picture 4', status: 'processed',url:'https://picsum.photos/350/165?random'},
                {name: 'Title of the Picture 5', status: 'processed',url:'https://picsum.photos/350/165?random'},
                {name: 'Title of the Picture 6', status: 'processed',url:'https://picsum.photos/350/165?random'}
            ] 
        }
    }
}
</script>