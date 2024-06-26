<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">
      Comprar Ticket para {{ movie.title }}
    </h1>
    <form @submit.prevent="buyTicket">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
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
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Comprar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["movie"],
  data() {
    return {
      customer: {
        name: "",
        email: "",
      },
      tickets: 1,
      location: "",
    };
  },
  methods: {
    buyTicket() {
      const ticketInfo = {
        name: this.customer.name,
        email: this.customer.email,
        quantity: this.tickets,
        location: this.location,
        movie: this.movie.title,
      };
      this.$emit("ticket-purchased", ticketInfo);
    },
  },
};
</script>

<style scoped>
/* TailwindCSS should handle most of the styling */
</style>
