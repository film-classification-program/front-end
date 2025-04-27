<template>
  <div class="logo-container">
    <h1 class="film-logo-text">Film</h1>
  </div>
</template>

<script>
export default {
  name: 'FilmLogo'
}
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  text-align: center;
}

.film-logo-text {
  font-size: 42px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

@media (max-width: 768px) {
  .film-logo-text {
    font-size: 32px;
  }
}
</style> 