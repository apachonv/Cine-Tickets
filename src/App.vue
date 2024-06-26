<template>
  <div id="app">
    <MoviesList @select-movie="handleSelectMovie" />
    <TicketForm v-if="selectedMovie" :movie="selectedMovie" />
  </div>
</template>

<script>
import MoviesList from "./components/MoviesList.vue";

export default {
  data() {
    return {
      selectedMovie: null,
    };
  },
  components: {
    MoviesList,
  },
  methods: {
    handleSelectMovie(movie) {
      this.selectedMovie = movie;
    },
  },
};
</script>
