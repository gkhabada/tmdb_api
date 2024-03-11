import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '../components/HomeComponent.vue'
import MovieComponent from '../components/MovieComponent.vue'

Vue.use(Router)

export default new Router({
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    }, {
      path: '/movie/:id',
      name: 'movie',
      component: MovieComponent
    }
  ],
  mode: 'history'
})
