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
import jsPDF from "jspdf";

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
      // Lógica para procesar la compra y generar la factura en PDF
      const sale = {
        ...this.customer,
        tickets: this.tickets,
        location: this.location,
        movie: this.movie,
        date: new Date(),
      };
      this.generatePDF(sale);
    },
    generatePDF(sale) {
      // Aquí utilizarías una librería como jsPDF para generar la factura en PDF
      // Ejemplo básico:
      const doc = new jsPDF();
      doc.text(`Factura de Venta`, 10, 10);
      doc.text(`Nombre: ${sale.name}`, 10, 20);
      doc.text(`Correo Electrónico: ${sale.email}`, 10, 30);
      doc.text(`Película: ${sale.movie.title}`, 10, 40);
      doc.text(`Cantidad de Entradas: ${sale.tickets}`, 10, 50);
      doc.text(`Ubicación: ${sale.location}`, 10, 60);
      doc.text(`Fecha y Hora de la Venta: ${sale.date}`, 10, 70);
      doc.save("factura.pdf");
    },
  },
};
</script>

<style scoped>
/* TailwindCSS should handle most of the styling */
</style>
