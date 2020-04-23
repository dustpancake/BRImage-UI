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
              v-model="displayUrl"
            >
            </v-text-field >
            <input type="file" @change="onTest" />     
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
/* eslint-disable */
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      url: this.randomImage(),
      filename: ""
    }
  },
  computed: {
    displayUrl() {
      return this.url.startsWith("data") ? this.filename : this.url ;
    }
  },
  methods: {
    onUndo() {
      this.url=this.randomImage();
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
          }
        )
        .then(response => {
          console.log(response);
          setTimeout(() => {
            this.url = response.data;
          }, 2000);       
        })
        .catch(error => {
          console.log(error);
        })
    },
    onTest(event) {
      const file = event.target.files[0];
      this.filename = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.url = e.target.result;
        axios
          //.get(`https://dpwsttrm5b.execute-api.eu-west-1.amazonaws.com/Prod/image/upload/uri?type=image%2Fjpeg&filename=michael%2Ejpg`)
          .get('https://dpwsttrm5b.execute-api.eu-west-1.amazonaws.com/Prod/image/upload/uri',{
              params: {
                type: file.type,
                filename: file.name
              }
            }
          )
          .then(response => {
            console.log(response.data);
            console.log(response.data.uri);
            const options = {
              headers: {
                'Content-Type': file.type
              }
            };
            return axios
              .put(response.data.uri,file,options)
              .then(result => {
                return response.data.uri.split("?")[0];
              })
          })
          .then(uri => {
            return axios
              .post('https://dpwsttrm5b.execute-api.eu-west-1.amazonaws.com/Prod/image/fm',
                {
                  uri:uri,
                }
              )
              .then(ans => {
                console.log(ans);
                setTimeout(() => {
                  this.url = ans.data;
                }, 2000);       
              });
          })
          .catch(error => {
            console.log(error);
          })
      };
    }
  }
}
</script>