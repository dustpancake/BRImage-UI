<template>
  <div class="home">
    <v-img
      src="https://picsum.photos/350/165?random"
      height="500"
      class="grey darken-4"
    >
    </v-img>

    <v-file-input 
      label="image input" 
      outlined 
      dense
    >
    </v-file-input>

    <v-btn>
      <span>Upload</span>
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => ({
    path: 'not chosen'
  })
}
</script>
