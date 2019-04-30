<template>
  <div class="api">
    <h4>https://www.themoviedb.org/settings/api</h4>
    <h5>api_key=4349e092aadf87a170f4f5dd9344058b</h5>
    <div class="movie_list">
      <p v-for="(category, index) in movie_list.genres" :key="index" @click="loadCard(category.id)">{{category.name}}</p>
    </div>
    <hr>
      <div class="movie_list_id" v-if="movie_list_id === null">
        <div class="movie_item" v-for="(movie, i) in movie_popular.results" :key="i">
          <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title">
          <h2 >{{movie.title || 'Пусто'}}</h2>
          <h5>{{ (movie.overview.substring(0,100) + "...") || ''}}</h5>
          <router-link :to="{ name: 'movie', params: {id: movie.id} }">Подробнее</router-link>
        </div>
      </div>
    <hr>
    <hr>
    <h1 v-if="movie_list_id">{{movie_list_id.name}}</h1>
    <hr>
    <div class="movie_list_id" v-if="movie_list_id">
      <div class="movie_item" v-for="(movie, i) in movie_list_id.items" :key="i">
        <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title">
        <h2 >{{movie.title || 'Пусто'}}</h2>
        <h5>{{(movie.overview.substring(0,100) + "...") || ''}}</h5>
        <router-link :to="{ name: 'movie', params: {id: movie.id} }">Подробнее</router-link>
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
      api_key: '?api_key=4349e092aadf87a170f4f5dd9344058b',
      movie_list: '',
      movie_popular: null,
      movie_list_id: null
    }
  },
  mounted() {
    axios
      // .get(this.api_url + '3/movie/550?' + this.api_key)
      .get('https://api.themoviedb.org/3/genre/movie/list' + this.api_key)
      .then(response => (this.movie_list = response.data));
    axios
      .get('https://api.themoviedb.org/3/movie/popular' + this.api_key + '&page=1')
      .then(response2 => (this.movie_popular = response2.data));
  },
  methods: {
    loadCard(id) {
      axios
      // .get(this.api_url + '3/movie/550?' + this.api_key)
        .get('https://api.themoviedb.org/3/list/' + id + this.api_key)
        .then(response => (this.movie_list_id = response.data));
    }
  }
}
</script>

<style scoped>
h4, h5  {
  text-align: center;
}
.movie_list {
  display: flex;
}
.movie_list p {
  margin: 5px 10px;
}


.movie_list_id {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
}

.movie_item {
  border: 1px solid #aaa;
  border-radius: 10px;
  width: 23%;
  margin-bottom: 15px;
  min-height: 500px;
  padding-bottom: 15px;
  box-sizing: border-box;
}

.movie_item img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: top;
}

</style>
