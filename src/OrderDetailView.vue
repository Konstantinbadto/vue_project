<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" lg="6">
          <h1 class="text--secondary mb-3 mt-3">Order Details</h1>
          <v-card v-if="order">  <!--  Добавили v-if, чтобы показывать карточку только если order есть -->
            <v-card-title>{{ order.name }}</v-card-title>
            <v-card-subtitle>{{ order.phone }}</v-card-subtitle>
            <v-card-text>
              <p>Ad ID: {{ order.adId }}</p>
              <p>User ID: {{ order.userId }}</p>
              <p>Done: {{ order.done }}</p>
            </v-card-text>
          </v-card>
          <div v-else>  <!--  Если order нет, показываем сообщение -->
            Заказ не найден
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    computed: {
      order() {
        console.log("this.id из props:", this.id);  //  Выводим id, который получили
        const order = this.$store.state.orders.orders.find(order => {
          console.log("Сравниваем order.id:", order.id, "с this.id:", this.id);  //  Выводим id заказа и id из props
          return String(order.id) === String(this.id)  // Важно! Сравнивай строки!
        });
        console.log("Найденный order:", order);  //  Выводим найденный заказ
        return order;
      }
    },
  };
  </script>
