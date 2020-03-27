<template>
  <div class="dashboard">

    <v-img
      :src="url"
      height="500"
      class="grey darken-4"
    >
    </v-img>

    <v-text-field 
      label="image input" 
      placeholder="URL"
      outlined 
      dense
      prepend-icon="add_a_photo"
      class="mt-4 mx-2"
      @change="onUrlInput"
    >
    </v-text-field >

    <v-btn class="ml-10" @click="onUndo">
      <span>Undo</span>
      <v-icon right dark>undo</v-icon>
    </v-btn>

    <v-btn class="ml-10">
      <span>Upload</span>
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      url: "https://picsum.photos/350/165?random"
    }
  },
  methods: {
    onUndo() {
      this.url="https://picsum.photos/350/165?random";
    },
    onUrlInput(event) {
      this.url=event;
    }
  }
}
</script>
