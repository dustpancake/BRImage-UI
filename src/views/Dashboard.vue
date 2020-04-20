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
      v-model="url"
    >
    </v-text-field >

    <v-btn class="ml-10" @click="onUndo">
      <span>Undo</span>
      <v-icon right dark>undo</v-icon>
    </v-btn>

    <v-btn class="ml-10" @click="onUpload">
      <span>Upload</span>
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      url: this.randomImage()
    }
  },
  methods: {
    onUndo() {
      this.url=this.randomImage()
    },
    onUrlInput(event) {
      this.url=event;
    },
    randomImage() {
      return "https://picsum.photos/seed/" + Math.floor(Math.random()*0xFFFFFF).toString(16) + "/350/165";
    },
    onUpload(event) {
      console.log(event);
      console.log(this.url);
      const options = {
        crossDomain:true
      };
      axios
        .post('https://dpwsttrm5b.execute-api.eu-west-1.amazonaws.com/Prod/image/fm',
          {
            uri:this.url,
            omega:0.1,
            phase:0.5
          },
          options
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>
