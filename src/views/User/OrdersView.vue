<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" lg="6">
          <h1 class="text--secondary mb-3 mt-3">Orders</h1>
          <v-list>
            <v-list-item v-for="order in orders" :key="order.id">
              <template v-slot:prepend>
                <v-checkbox
                  v-model="order.done"
                  color="primary"
                  @click="markDone(order)"
                ></v-checkbox>
              </template>
              <v-list-item-title>{{ order.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
              <template v-slot:append>
                <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <script>
  export default {
    data() {
      return {
        orders: [
          {
            id: "123",
            name: "Kostya",
            phone: "+7(978)000-00-05",
            adId: "1",
            done: true
          }
        ]
      };
    },
    methods: {
      markDone(order) {
        // Здесь можно выполнить какие-то действия, связанные с изменением состояния заказа (например, отправить запрос на сервер).
        console.log(`Order ${order.id} marked as ${order.done ? 'done' : 'undone'}`);
      }
    }
  };
  </script>
