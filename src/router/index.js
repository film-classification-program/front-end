import { createRouter, createWebHistory } from 'vue-router'
import FilmSearch from '../components/FilmSearch.vue'
import SearchResults from '../components/SearchResults.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: FilmSearch
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
    props: route => ({ query: route.query.desc })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 