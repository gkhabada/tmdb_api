<template>
  <div class="api">
    <h4>https://www.themoviedb.org/settings/api</h4>
    <h5>api_key=4349e092aadf87a170f4f5dd9344058b</h5>
    <p>{{info}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Home',
  data () {
    return {
      api_url: 'https://api.themoviedb.org/',
      api_key: 'api_key=4349e092aadf87a170f4f5dd9344058b',
      info: ''
    }
  },
  mounted() {
    axios
      .get(this.api_url + '3/movie/550?' + this.api_key)
      .then(response => (this.info = response));
  }
}
</script>

<style scoped>
h4, h5  {
  text-align: center;
}
</style>
