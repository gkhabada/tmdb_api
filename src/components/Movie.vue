<template>
  <div class="">
    <h1>{{movie.title || ''}}</h1>
    <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
    <p><span>Описание:</span> {{movie.overview}}</p>
    <hr>
    <p><span>Язык:</span> {{movie.spoken_languages[0].name}}</p>
    <p><span>Страна:</span> {{movie.production_countries[0].name}}</p>
    <p><span>Дата выпуска:</span> {{movie.release_date}}</p>
    <p><span>Популярность:</span> {{movie.popularity}}</p>
    <p><span>Бюджет:</span> {{movie.budget}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Movie',
  data () {
    return {
      api_url: 'https://api.themoviedb.org/',
      api_key: '?api_key=4349e092aadf87a170f4f5dd9344058b',
      movie: null
    }
  },
  created() {
    axios
      .get('https://api.themoviedb.org/3/movie/' + this.$route.params.id + this.api_key)
      .then(response => (this.movie = response.data));
  }
}
</script>

<style lang="css" scoped>
span {
  font-weight: bold;
}
</style>
