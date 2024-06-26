<template>
  <div id="app">
    <MoviesList @select-movie="handleSelectMovie" />
    <TicketForm v-if="selectedMovie" :movie="selectedMovie" />
  </div>
</template>

<script>
import MoviesList from "./components/MoviesList.vue";
import TicketForm from "./components/TicketForm.vue";

export default {
  data() {
    return {
      selectedMovie: null,
    };
  },
  components: {
    MoviesList,
    TicketForm,
  },
  methods: {
    handleSelectMovie(movie) {
      this.selectedMovie = movie;
    },
  },
};
</script>

<style>
/* TailwindCSS should handle most of the styling */
</style>
