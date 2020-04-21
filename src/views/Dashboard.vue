<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
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
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
        <v-text-field class="pt-2"
            label="Omega"
            placeholder="0.001"
            outlined
        ></v-text-field>    
        <v-text-field
            label="Phase"
            placeholder="0.005"
            outlined
        ></v-text-field> 
        <v-text-field
            label="Lowpass"
            placeholder="1.00"
            outlined
        ></v-text-field> 
        <v-text-field
            label="pQuantize"
            placeholder="0.001"
            outlined
        ></v-text-field> 
        <v-btn class="mx-1" @click="onUndo">
          <span>Random</span>
          <v-icon right dark>autorenew</v-icon>
        </v-btn>
        <v-btn class="mx-1" @click="onUpload">
          <span>Process</span>
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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
    onUpload() {
      console.log(this.url);
      axios
        .post('https://dpwsttrm5b.execute-api.eu-west-1.amazonaws.com/Prod/image/fm',
          {
            uri:this.url,
            omega:0.1,
            phase:0.5
          }
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