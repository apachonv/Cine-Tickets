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
          <TicketForm
            :movie="selectedMovie"
            @ticket-purchased="downloadTicketPdf"
          />
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
          <TicketForm
            :movie="selectedMovie"
            @ticket-purchased="downloadTicketPdf"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNowPlayingMovies, getUpcomingMovies } from "@/services/api";
import TicketForm from "@/components/TicketForm.vue";
import { jsPDF } from "jspdf";

export default {
  components: {
    TicketForm,
  },
  data() {
    return {
      nowPlayingMovies: [],
      upcomingMovies: [],
      selectedMovie: null,
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
    downloadTicketPdf(ticketInfo) {
      const doc = new jsPDF();
      doc.text("Ticket de Compra", 10, 10);
      doc.text(`Nombre: ${ticketInfo.name}`, 10, 20);
      doc.text(`Correo Electrónico: ${ticketInfo.email}`, 10, 30);
      doc.text(`Película: ${ticketInfo.movie}`, 10, 40);
      doc.text(`Cantidad de Entradas: ${ticketInfo.quantity}`, 10, 50);
      doc.text(`Ubicación: ${ticketInfo.location}`, 10, 60);
      doc.save("ticket.pdf");
    },
  },
};
</script>

<style scoped>
/* TailwindCSS debería manejar la mayoría de los estilos */
</style>
