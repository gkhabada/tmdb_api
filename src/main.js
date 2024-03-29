import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
