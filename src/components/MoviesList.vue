<script>
import { getNowPlayingMovies, getUpcomingMovies } from "@/services/api";

export default {
  data() {
    return {
      nowPlayingMovies: [],
      upcomingMovies: [],
      selectedMovie: null,
      customerName: "",
      customerEmail: "",
      ticketQuantity: 1,
      location: "",
    };
  },
  async created() {
    this.nowPlayingMovies = await getNowPlayingMovies();
    this.upcomingMovies = await getUpcomingMovies();
  },
  methods: {
    scrollToNowPlaying() {
      const element = document.getElementById("now-playing");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    scrollToUpcoming() {
      const element = document.getElementById("upcoming");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    togglePurchaseForm(movie) {
      this.selectedMovie = this.selectedMovie === movie ? null : movie;
      if (!this.selectedMovie) {
        this.resetForm();
      }
    },
    resetForm() {
      this.customerName = "";
      this.customerEmail = "";
      this.ticketQuantity = 1;
      this.location = "";
    },
    purchaseTicket() {
      // Lógica para manejar la compra del ticket
      console.log("Compra realizada");
    },
  },
};
</script>

<template>
  <div class="p-4 bg-[#f4f4f5]">
    <!-- Barra de navegación fija -->
    <nav
      class="sticky top-0 z-50 bg-white shadow-lg flex items-center justify-between p-4 mb-6"
    >
      <div class="flex items-center">
        <img src="@/assets/logo.png" alt="Logo" class="h-8 mr-2" />
      </div>
      <div class="flex">
        <button
          @click="scrollToNowPlaying"
          class="px-4 py-2 rounded mr-4 bg-[#13472E] text-white hover:bg-emerald-950 transition duration-200 font-afacad font-semibold"
        >
          Cartelera
        </button>
        <button
          @click="scrollToUpcoming"
          class="px-4 py-2 rounded mr-4 bg-[#13472E] text-white hover:bg-emerald-950 transition duration-200 font-afacad font-semibold"
        >
          Próximamente
        </button>
      </div>
    </nav>

    <h1
      id="now-playing"
      class="text-3xl font-afacad font-semibold mb-6 text-center tracking-wide text-[#13472E]"
    >
      Películas en Cartelera
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="movie in nowPlayingMovies" :key="movie.id">
        <!-- Tarjeta de la película -->
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            alt="Movie Poster"
            class="w-full h-64 object-cover"
          />
          <div class="p-4">
            <h2 class="text-xl font-afacad font-semibold mb-2">
              {{ movie.title }}
            </h2>
            <button
              @click="togglePurchaseForm(movie)"
              class="mt-4 bg-[#13472E] text-white px-4 py-2 rounded hover:bg-emerald-950 transition duration-200 font-afacad font-semibold"
            >
              Comprar Ticket
            </button>
          </div>
        </div>

        <!-- Formulario de compra -->
        <div
          v-if="selectedMovie === movie"
          class="bg-white p-4 rounded-lg shadow-md mt-4"
        >
          <h2 class="text-2xl font-afacad font-semibold mb-4">
            Compra de Entradas para {{ movie.title }}
          </h2>
          <form @submit.prevent="purchaseTicket">
            <div class="mb-4">
              <label
                for="name"
                class="font-afacad font-semibold block text-gray-700"
                >Nombre</label
              >
              <input
                type="text"
                v-model="customerName"
                id="name"
                class="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div class="mb-4">
              <label
                for="email"
                class="font-afacad font-semibold block text-gray-700"
                >Correo Electrónico</label
              >
              <input
                type="email"
                v-model="customerEmail"
                id="email"
                class="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div class="mb-4">
              <label
                for="quantity"
                class="font-afacad font-semibold block text-gray-700"
                >Cantidad de Entradas</label
              >
              <input
                type="number"
                v-model="ticketQuantity"
                id="quantity"
                class="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div class="mb-4">
              <label
                for="location"
                class="font-afacad font-semibold block text-gray-700"
                >Ubicación</label
              >
              <input
                type="text"
                v-model="location"
                id="location"
                class="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <button
              type="submit"
              class="px-4 py-2 rounded mr-4 bg-[#13472E] text-white hover:bg-emerald-950 transition duration-200 font-afacad font-semibold"
            >
              Comprar
            </button>
          </form>
        </div>
      </div>
    </div>

    <h1 class="p-6"></h1>
    <h1
      id="upcoming"
      class="text-3xl font-afacad font-semibold mb-6 text-center tra6cking-wide text-[#13472E] top-6"
    >
      Películas Próximamente
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="movie in upcomingMovies" :key="movie.id">
        <!-- Tarjeta de la película -->
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            alt="Movie Poster"
            class="w-full h-64 object-cover"
          />

          <div class="p-4">
            <h2 class="text-xl font-bold mb-2">{{ movie.title }}</h2>
            <button
              @click="togglePurchaseForm(movie)"
              class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Comprar Ticket
            </button>
          </div>
        </div>

        <!-- Formulario de compra -->
        <div
          v-if="selectedMovie === movie"
          class="bg-gray-100 p-4 rounded-lg shadow-md mt-4"
        >
          <h2 class="text-2xl font-bold mb-4">
            Compra de Entradas para {{ movie.title }}
          </h2>
          <form @submit.prevent="purchaseTicket">
            <div class="mb-4">
              <label
                for="name"
                class="font-afacad font-semibold block text-gray-700"
                >Nombre</label
              >
              <input
                type="text"
                v-model="customerName"
                id="name"
                class="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div class="mb-4">
              <label
                for="email"
                class="font-afacad font-semibold block text-gray-700"
                >Correo Electrónico</label
              >
              <input
                type="email"
                v-model="customerEmail"
                id="email"
                class="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div class="mb-4">
              <label
                for="quantity"
                class="font-afacad font-semibold block text-gray-700"
                >Cantidad de Entradas</label
              >
              <input
                type="number"
                v-model="ticketQuantity"
                id="quantity"
                class="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div class="mb-4">
              <label
                for="location"
                class="font-afacad font-semibold block text-gray-700"
                >Ubicación</label
              >
              <input
                type="text"
                v-model="location"
                id="location"
                class="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <button
              type="submit"
              class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Comprar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* TailwindCSS debería manejar la mayoría de los estilos */
</style>
