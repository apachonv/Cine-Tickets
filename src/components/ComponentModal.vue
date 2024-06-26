<template>
  <div
    class="fixed inset-0 flex justify-center bg-gray-800 bg-opacity-60 p-4 md:p-4"
  >
    <div
      class="bg-white p-6 rounded-lg max-w-4xl w-full relative flex overflow-y-auto"
    >
      <div class="flex-none w-2/4 pr-6">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          alt="Movie Poster"
          class="w-full rounded-lg mb-4"
          style="max-height: 500px"
        />
        <h2 class="font-afacad font-bold text-lg mb-2">
          {{ movie.title }}
        </h2>
        <p class="font-afacad font-semibold text-sm -700 mb-4">
          {{ movie.overview }}
        </p>
        <p class="font-afacad font-semibold text-sm -700 mb-4">
          {{ categories }}
        </p>
        <p class="font-afacad font-semibold text-sm -700 mb-4">
          Fecha de estreno {{ releaseDate }}
        </p>
        <p class="font-afacad font-semibold text-sm -700 mb-4">
          {{ duration }} min
        </p>
        <p class="font-afacad font-semibold text-sm -700 mb-4">
          Precio $10.000
        </p>
        <p class="p-4"></p>
      </div>

      <div class="flex-1">
        <button
          class="absolute top-2 right-2 bg-[#BE959F] px-2 py-2 hover:bg-[#8c5462] transition duration-200 rounded-full"
          @click="$emit('close')"
        >
          <svg
            class="h-4 w-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h1 class="text-2xl font-bold mb-4">
          Comprar Ticket para {{ movie.title }}
        </h1>
        <form @submit.prevent="buyTicket">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Nombre</label
            >
            <input
              v-model="customer.name"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Correo Electrónico</label
            >
            <input
              v-model="customer.email"
              type="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Cantidad de Entradas</label
            >
            <input
              v-model="tickets"
              type="number"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              @input="calculateTotal"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Ubicación</label
            >
            <input
              v-model="location"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div class="mb-4">
            <button
              type="submit"
              class="mt-4 bg-[#13472E] text-white px-4 py-2 rounded hover:bg-emerald-950 transition duration-200 font-afacad font-semibold"
            >
              Comprar
            </button>
          </div>
          <div>
            <p class="text-gray-700 text-sm font-bold">Total: ${{ total }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getMovieDetails, getMovieVideos } from "@/services/api";

export default {
  props: {
    movie: Object,
  },
  data() {
    return {
      customer: {
        name: "",
        email: "",
      },
      tickets: 1,
      location: "",
      categories: "",
      releaseDate: "",
      duration: "",
      trailer: null,
      total: 10000,
    };
  },
  methods: {
    async fetchAdditionalMovieDetails() {
      try {
        const details = await getMovieDetails(this.movie.id);
        if (details) {
          console.log("Movie Details:", details);
          this.categories = details.genres
            .map((genre) => genre.name)
            .join(", ");
          this.releaseDate = details.release_date;
          this.duration = details.runtime;
        }

        const videos = await getMovieVideos(this.movie.id);
        console.log("Movie Videos:", videos);
        this.trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
      } catch (error) {
        console.error("Error fetching additional movie details:", error);
      }
    },
    calculateTotal() {
      this.total = this.tickets * 10000;
    },
    buyTicket() {
      const ticketInfo = {
        name: this.customer.name,
        email: this.customer.email,
        tickets: this.tickets,
        location: this.location,
        movie: this.movie.title,
        total: this.total,
      };
      this.$emit("ticket-purchased", ticketInfo);
      this.$emit("close");
    },
  },
  created() {
    this.fetchAdditionalMovieDetails();
  },
};
</script>
