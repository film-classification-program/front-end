<template>
  <div class="film-search">
    <div class="header">
      <div class="logo-title-container">
        <FilmLogo />
      </div>
    </div>
    
    <div class="search-section">
      <SearchBar 
        @search="performSearch" 
        :placeholder="searchPlaceholder"
      />
    </div>
    
    <div v-if="searchResults.length > 0" class="results-section">
      <div class="result-item" v-for="(result, index) in searchResults" :key="index">
        {{ result.title }}
      </div>
    </div>
  </div>
</template>

<script>
import FilmLogo from './FilmLogo.vue'
import SearchBar from './SearchBar.vue'

export default {
  name: 'FilmSearch',
  components: {
    FilmLogo,
    SearchBar
  },
  data() {
    return {
      searchPlaceholder: '你想找什么样的电影？',
      searchResults: []
    }
  },
  methods: {
    performSearch(query) {
      if (query.trim() !== '') {
        this.$router.push({
          path: '/search',
          query: { desc: query }
        })
      }
    }
  }
}
</script>

<style scoped>
.film-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 120px;
}

.header {
  margin-bottom: 40px;
}

.logo-title-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 32px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.search-section {
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
}

.results-section {
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}

.result-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
  text-align: left;
  font-size: 16px;
}

@media (max-width: 768px) {
  .film-search {
    padding-top: 80px;
  }

  .header {
    margin-bottom: 30px;
  }

  h1 {
    font-size: 28px;
  }
}
</style> 