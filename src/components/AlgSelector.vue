<template>
    <v-row  justify="center" no-gutters>
      <v-tabs
        background-color="grey accent-4"
        class="elevation-2"
        dark
        centered
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab
          v-for="a in algs"
          :key="a"
        >
          {{ a }}
        </v-tab>

      </v-tabs>
    </v-row>
</template>

<script>
export default {
    name: 'AlgSelector',

    data() {
      return {
        algs: [
          'FM'
        ]
      }
    }
}
</script>