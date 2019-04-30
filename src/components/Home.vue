<template>
  <div class="api">
    <h4>https://www.themoviedb.org/settings/api</h4>
    <h5>api_key=4349e092aadf87a170f4f5dd9344058b</h5>
    <div class="move_list">
      <p v-for="(category, index) in move_list.genres" :key="index" @click="loadCard(category.id)">{{category.name}}</p>
    </div>
    <hr>
    <hr>
    <hr>
    <h1 v-if="move_list_id">{{move_list_id.name}}</h1>
    <hr>
    <div class="move_list_id" v-if="move_list_id">
      <div class="move_item" v-for="(move, i) in move_list_id.items" :key="i">
        <h2 >{{move.title || 'Пусто'}}</h2>
        <h4>{{move.original_title || ''}}</h4>
        <h5>{{move.overview || ''}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Home',
  data () {
    return {
      api_url: 'https://api.themoviedb.org/',
      api_key: '?api_key=4349e092aadf87a170f4f5dd9344058b&language=ru',
      move_list: '',
      move_list_id: null
    }
  },
  mounted() {
    axios
      // .get(this.api_url + '3/movie/550?' + this.api_key)
      .get('https://api.themoviedb.org/3/genre/movie/list' + this.api_key)
      .then(response => (this.move_list = response.data));
  },
  methods: {
    loadCard(id) {
      axios
      // .get(this.api_url + '3/movie/550?' + this.api_key)
        .get('https://api.themoviedb.org/3/list/' + id + this.api_key)
        .then(response => (this.move_list_id = response.data));
    }
  }
}
</script>

<style scoped>
h4, h5  {
  text-align: center;
}
.move_list {
  display: flex;
}
.move_list p {
  margin: 5px 10px;
}


.move_list_id {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
}

.move_item {
  border: 1px solid #aaa;
  border-radius: 10px;
  width: 23%;
  margin-bottom: 15px;
}


</style>
