<template>
    <div class="library">
        <h1>TODO Library Page</h1>

        <v-container class="my-5">
            
            <v-layout row wrap class="pa-3">
                <v-flex xs12 sm6 md6 lg3 v-for="p in photos" :key="p.name">
                    <v-card class="text-center ma-3">
                        <v-responsive class="pt-4">
                            <v-avatar tile size="200" class="grey lighten-2">
                                <v-img :src="p.url"></v-img>
                            </v-avatar>
                        </v-responsive>
                        <v-card-text>
                            <div class="subheading">
                                {{ p.name }}
                            </div>
                            <div class="grey--text">
                                {{ p.status }}
                            </div>
                        </v-card-text>
                            <v-btn small text color="light-grey mx-2">
                                <v-icon small center>cloud_download</v-icon>
                            </v-btn>
                            <v-btn small text color="light-grey mx-2">
                                <v-icon small center>delete</v-icon>
                            </v-btn>
                        <v-card-actions>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>

        </v-container>

    </div>
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