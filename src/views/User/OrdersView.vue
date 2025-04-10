<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="6">
        <h1 class="text--secondary mb-3 mt-3">Orders</h1>
        <v-list>
          <v-list-item v-for="order in orders" :key="order.id">
            <v-list-item-content class="d-flex align-center">
              <v-checkbox v-model="order.done" @change="updateOrder(order)"></v-checkbox>
              <div>
                <v-list-item-title>{{ order.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
              </div>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="openOrder(order)">Open</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    orders() {
      return this.$store.getters.orders;
    }
  },
  mounted() {
    this.$store.dispatch('fetchOrders');
  },
  methods: {
    updateOrder(order) {
      // Здесь нужно отправить запрос на бэкенд для обновления статуса заказа
      console.log("Updating order:", order);
    },
    openOrder(order) {
  this.$router.push({ name: 'order-detail', params: { id: order.id } });

    }
  }
};
</script>
