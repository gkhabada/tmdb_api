<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-md-4">
        <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
      </div>
      <div class="col-md-8">
        <h1 class="mb-4 text-center">{{movie.title || ''}}</h1>
        <p><span>Описание:</span> {{movie.overview}}</p>
        <hr>
        <p><span>Язык:</span> {{movie.spoken_languages[0].name}}</p>
        <p><span>Страна:</span> {{movie.production_countries[0].name}}</p>
        <p><span>Дата выпуска:</span> {{movie.release_date}}</p>
        <p><span>Популярность:</span> {{movie.popularity}}</p>
        <p><span>Бюджет:</span> {{movie.budget}}</p>
        <a href="#video"class="btn btn-primary">Посмотреть видео</a>
      </div>
    </div>
    <div class="col-md=12 mt-5" id="video" v-if="getVideo">
      <h2 class="text-center">Видео</h2>
      <iframe v-for="(video, i) in getVideo.results" width="1280" height="720" :src="'https://www.youtube.com/embed/' + video.key" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Movie',
  data () {
    return {
      api_key: '?api_key=4349e092aadf87a170f4f5dd9344058b',
      movie: null,
      getVideo: null
    }
  },
  created() {
    axios
      .get('https://api.themoviedb.org/3/movie/' + this.$route.params.id + this.api_key)
      .then(response => (this.movie = response.data));
    axios
      .get('https://api.themoviedb.org/3/movie/' + this.$route.params.id + '/videos' + this.api_key)
      .then(response2 => (this.getVideo = response2.data));
  }
}
</script>

<style lang="css" scoped>
img {
  width: 100%;
}
span {
  font-weight: bold;
}
</style>
