import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueGtag from "vue-gtag"

Vue.config.productionTip = false

Vue.use(VueGtag, {
  config: { id: 'UA-165287410-1' }
}, router)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
