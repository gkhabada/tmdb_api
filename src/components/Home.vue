<template>
<div class="api">
  <h1 class="text-center pt-3">Films by API from <span class="text-success">themoviedb</span></h1>
  <div class="container-fluid px-5">
    <div class="row">
      <ul class="list-group col-lg-2 mt-5 pt-3" v-if="movie_list">
        <li :class="['list-group-item', { 'active': activeItem === category.id } ]" v-for="(category, index) in movie_list.genres" :key="index" @click="loadCard(category.id)">{{category.name|| ''}}</li>
      </ul>
      <div class="col-lg-10">
        <div class="d-flex flex-wrap align-content-start justify-content-around my-5 pt-3" v-if="movie_list_id === null && movie_popular">
          <div class="card mb-3 col-md-4 col-12" v-for="(movie, i) in movie_popular.results" :key="i">
            <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title">
            <div class="card-body">
              <h5 class="card-title">{{movie.title || 'Пусто'}}</h5>
              <p class="card-text">{{ (movie.overview.substring(0,100) + "...") || ''}}</p>
              <router-link :to="{ name: 'movie', params: {id: movie.id}}" class="btn btn-primary">Подробнее</router-link>
            </div>
          </div>
        </div>
        <h1 v-if="movie_list_id" class="text-center my-2">{{movie_list_id.name}}</h1>
        <div class="d-flex flex-wrap align-content-start justify-content-around" v-if="movie_list_id">
          <div class="card mb-3 col-md-4 col-12" v-for="(movie, i) in movie_list_id.items" :key="i">
            <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title">
            <div class="card-body">
              <h5 class="card-title">{{movie.title || 'Пусто'}}</h5>
              <p class="card-text">{{ (movie.overview.substring(0,100) + "...") || ''}}</p>
              <router-link :to="{ name: 'movie', params: {id: movie.id}}" class="btn btn-primary">Подробнее</router-link>
            </div>
          </div>
          <div class="mt-5" v-if="movie_list_id.items.length === 0">
            <h3 class="text-center">Фильмы отсутсвуют.</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="loading" v-if="loading">
    <h2>Загрузка...</h2>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Home',
  data() {
    return {
      api_key: '?api_key=4349e092aadf87a170f4f5dd9344058b',
      movie_list: '',
      activeItem: null,
      movie_popular: null,
      movie_list_id: null,
      loading: false
    }
  },
  mounted() {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list' + this.api_key)
      .then(response => (this.movie_list = response.data));
    axios
      .get('https://api.themoviedb.org/3/movie/popular' + this.api_key + '&page=1')
      .then(response2 => (this.movie_popular = response2.data));
  },
  methods: {
    loadCard(id) {
      this.loading = true
      axios
        .get('https://api.themoviedb.org/3/list/' + id + this.api_key)
        .then(response => {
          this.movie_list_id = response.data,
            this.activeItem = id,
            this.loading = false
        });
    }
  }
}
</script>

<style scoped>
h4,
h5 {
  text-align: center;
}

li {
  cursor: pointer;
}

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  z-index: 999;
  top: 0;
  left: 0;
  transition: 0.3s;
}

.card {
  width: 28%;
  position: relative;
  padding-bottom: 50px;
}

.card a {
  position: absolute;
  bottom: 30px;
}

.card img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: top;
}
</style>
