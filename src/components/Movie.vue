<template>
<div class="container pt-5">
  <div class="text-right mb-4">
    <router-link :to="{ name: 'home' }" class="btn btn-danger ">На главную страницу</router-link>
  </div>
  <div class="row" v-if="movie">
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
      <a href="#video" class="btn btn-primary">Посмотреть видео</a>
    </div>
  </div>
  <div class="col-md=12 my-5" id="video" v-if="getVideo && getVideo.results.length">
    <h2 class="text-center">Видео</h2>
    <div class="video__wrapper" v-for="(video, i) in getVideo.results.slice(0, 2)">
        <iframe :src="'https://www.youtube.com/embed/' + video.key" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
  name: 'Movie',
  data() {
    return {
      api_key: '?api_key=4349e092aadf87a170f4f5dd9344058b',
      movie: null,
      getVideo: null,
      loading: false
    }
  },
  created() {
    this.loading = true
    axios
      .get('https://api.themoviedb.org/3/movie/' + this.$route.params.id + this.api_key)
      .then(response => {
        this.movie = response.data
        this.loading = false
      });
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

.video__wrapper {
  width: 100%;
  /* height: 0; */
  position: relative;
  padding-bottom: 56.25%;
  margin-bottom: 20px;
}

.video__wrapper iframe {
  position: absolute;
  width: 100%;
  height: 100%;
}

iframe {
  width: 100%;
  height: 100%;
}


.loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.1);
  color: #000;
  z-index: 999;
  top: 0;
  left: 0;
  transition: 0.3s;
}
</style>
