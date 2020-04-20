<template>
  <div class="help">
    <div>
      <h1>TODO Help Page</h1>
      <p>{{ info }}</p>
    </div>
    <div>
      <p>Message from BRimage: {{ brmsg }}</p>
      <v-btn @click="clickBrimage">BRImage</v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    clickBrimage(event) {
      console.log(event)
      axios
        .get('https://dpwsttrm5b.execute-api.eu-west-1.amazonaws.com/Prod/greeting')
        .then(response => (this.brmsg = response))
        .catch(error => (this.brmsg = error))
    }
  },
  computed: {

  },
  data() {
    return {
      info: null,
      brmsg: null
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response.data.bpi.GBP))
      .catch(error => console.log(error))
  }
}
</script>