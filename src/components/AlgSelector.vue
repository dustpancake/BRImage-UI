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
          v-for="i in 3"
          :key="i"
        >
          Alg {{ i }}
        </v-tab>

      </v-tabs>
    </v-row>
</template>

<script>
export default {
    name: 'AlgSelector'
}
</script>