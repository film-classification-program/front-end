<template>
  <div class="search-results-page">
    <div class="search-header">
      <div class="logo-and-search">
        <router-link to="/" class="logo-link">
          <FilmLogo class="small-logo" />
        </router-link>
        <div class="inline-search">
          <SearchBar 
            @search="performSearch" 
            :placeholder="searchPlaceholder"
            :initial-query="query"
          />
        </div>
      </div>
      <div class="search-divider"></div>
    </div>
    
    <div class="results-container">
      <!-- 搜索状态显示 -->
      <div v-if="isLoading" class="loading">
        <div class="loading-spinner"></div>
        <span>正在搜索中...</span>
      </div>
      
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      
      <template v-else>
        <div class="results-count" v-if="searchResults.length > 0">
          找到 {{ searchResults.length }} 条关于 "{{ query }}" 的搜索结果
        </div>
        <div class="no-results" v-else-if="searchResultsLoaded">
          未找到关于 "{{ query }}" 的相关电影
        </div>
        
        <div class="results-list">
          <div class="result-item" v-for="(result, index) in searchResults" :key="index">
            <div class="movie-header">
              <a :href="result.link" target="_blank" rel="noopener noreferrer" class="movie-title">{{ result.title }}</a>
              <div class="movie-rating" v-if="result.rating !== '暂无评分'">
                <span class="rating-label">评分:</span>
                <span class="rating-value">{{ result.rating }}</span>
              </div>
            </div>
            
            <div class="movie-info-grid">
              <div class="info-group">
                <div class="info-row" v-if="result.alias !== '暂无别名'">
                  <span class="info-icon">🏷️</span>
                  <span class="info-label">别名:</span>
                  <span class="info-value truncate" :title="result.alias">{{ result.alias }}</span>
                </div>
                
                <div class="info-row" v-if="result.actors !== '暂无主演信息'">
                  <span class="info-icon">👥</span>
                  <span class="info-label">主演:</span>
                  <span class="info-value truncate" :title="result.actors">{{ result.actors }}</span>
                </div>
                
                <div class="info-row" v-if="result.director !== '暂无导演信息'">
                  <span class="info-icon">🎬</span>
                  <span class="info-label">导演:</span>
                  <span class="info-value">{{ result.director }}</span>
                </div>
              </div>
              
              <div class="info-group">
                <div class="info-row" v-if="result.types">
                  <span class="info-icon">🎭</span>
                  <span class="info-label">类型:</span>
                  <span class="info-value">{{ result.types }}</span>
                </div>
                
                <div class="info-row" v-if="result.duration">
                  <span class="info-icon">⏱️</span>
                  <span class="info-label">片长:</span>
                  <span class="info-value">{{ result.duration }}</span>
                </div>
                
                <div class="info-row" v-if="result.language !== '暂无语言信息'">
                  <span class="info-icon">🌐</span>
                  <span class="info-label">语言:</span>
                  <span class="info-value">{{ result.language }}</span>
                </div>
                
                <div class="info-row" v-if="result.imdb !== '暂无IMDb编号'">
                  <span class="info-icon">🎞️</span>
                  <span class="info-label">IMDb:</span>
                  <span class="info-value">{{ result.imdb }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import FilmLogo from './FilmLogo.vue'
import SearchBar from './SearchBar.vue'
import { searchFilms } from '../services/filmApi'

export default {
  name: 'SearchResults',
  components: {
    FilmLogo,
    SearchBar
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchPlaceholder: '你想找什么样的电影？',
      searchResults: [],
      searchResultsLoaded: false,
      isLoading: false,
      error: null
    }
  },
  created() {
    if (this.query) {
      this.fetchResults()
    }
  },
  watch: {
    query(newValue) {
      if (newValue) {
        this.fetchResults()
      }
    }
  },
  methods: {
    performSearch(query) {
      if (query.trim() !== '') {
        this.$router.replace({
          path: '/search',
          query: { desc: query }
        })
      }
    },
    async fetchResults() {
      this.isLoading = true
      this.error = null
      this.searchResultsLoaded = false
      
      try {
        this.searchResults = await searchFilms(this.query)
        this.searchResultsLoaded = true
      } catch (error) {
        console.error('搜索失败:', error)
        this.error = '搜索请求失败，请稍后重试'
        this.searchResults = []
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.search-results-page {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.search-header {
  padding: 20px 40px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.logo-and-search {
  display: flex;
  align-items: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.small-logo :deep(.film-logo-text) {
  font-size: 28px;
}

.logo-link {
  text-decoration: none;
  color: inherit;
}

.inline-search {
  flex: 1;
}

.inline-search :deep(.search-container) {
  flex-direction: row;
  gap: 20px;
  align-items: center;
}

.inline-search :deep(.search-bar) {
  margin-bottom: 0;
}

.search-divider {
  height: 1px;
  background-color: #e0e0e0;
  width: 100%;
  margin-top: 20px;
}

.results-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

.results-count {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.no-results, .loading {
  font-size: 16px;
  color: #555;
  text-align: center;
  padding: 40px 0;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  transition: box-shadow 0.2s;
}

.result-item:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.movie-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 8px;
}

.movie-title {
  font-size: 18px;
  font-weight: 500;
  color: #1a73e8;
  text-decoration: none;
  display: inline-block;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.movie-title:hover {
  text-decoration: underline;
  color: #1557b0;
}

.movie-rating {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
}

.rating-label {
  color: #707070;
  margin-right: 4px;
}

.rating-value {
  color: #ff9800;
  font-weight: 500;
}

.movie-info-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.info-group {
  flex: 1;
  min-width: 300px;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
}

.info-icon {
  width: 20px;
  margin-right: 4px;
  text-align: center;
}

.info-label {
  color: #707070;
  margin-right: 4px;
  width: 40px;
  flex-shrink: 0;
}

.info-value {
  color: #333;
  flex: 1;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  cursor: default;
}

@media (max-width: 768px) {
  .logo-and-search {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .movie-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .movie-info-grid {
    flex-direction: column;
    gap: 12px;
  }
  
  .info-group {
    min-width: unset;
  }
  
  .search-header {
    padding: 15px 20px;
  }
  
  .inline-search :deep(.search-container) {
    flex-direction: column;
  }
  
  .inline-search :deep(.search-bar) {
    margin-bottom: 15px;
  }
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  color: #555;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1a73e8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.error-message {
  text-align: center;
  color: #d32f2f;
  padding: 40px 0;
  font-size: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 