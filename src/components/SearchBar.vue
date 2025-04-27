<template>
  <div class="search-container">
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        :placeholder="placeholder"
        @keyup.enter="handleSearch"
      />
      <button class="search-icon" @click="handleSearch">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    placeholder: {
      type: String,
      default: '你想找什么样的电影？'
    },
    buttonText: {
      type: String,
      default: '找电影'
    },
    initialQuery: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchQuery: this.initialQuery
    }
  },
  watch: {
    initialQuery(newValue) {
      this.searchQuery = newValue
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.search-bar {
  position: relative;
  width: 100%;
}

input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 24px;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

input:focus {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: #aaa;
}

.search-icon {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
}

.search-icon:hover {
  color: #333;
  background-color: rgba(0, 0, 0, 0.03);
}

@media (max-width: 768px) {
  input {
    padding: 10px 40px 10px 12px;
    font-size: 14px;
  }
  
  .search-icon {
    width: 36px;
    padding: 0;
  }
}
</style> 