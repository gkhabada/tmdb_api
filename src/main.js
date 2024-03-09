import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';

// import axios from 'axios'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})

// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
