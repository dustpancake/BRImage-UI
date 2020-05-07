<template>

  <v-container>

    <display />

    <triggers />

    <fm-input />

    <alg-selector />

  </v-container>
  
</template>

<script>
import Display from '../components/Display'
import Triggers from '../components/Triggers'
import FmInput from '../components/FmInput'
import AlgSelector from '../components/AlgSelector'

export default {
  name: 'Dashboard',
  components: { Display, Triggers, FmInput, AlgSelector }
}
</script>