class Order {
  constructor(name, phone, adId, userId, done = false, showDetails = false, id = null) {
    this.name = name;
    this.phone = phone;
    this.adId = adId;
    this.userId = userId;
    this.done = done;
    this.showDetails = showDetails;
    this.id = id;
  }
}

  export default {
    state: {
      orders: []
    },
    mutations: {
      createOrder(state, payload) {
        state.orders.push(payload);
      },
      setOrders(state, orders) {
        state.orders = orders;
      }
    },
    actions: {
      async fetchOrders({ commit, rootState }) {
        try {
          // Реальный сетевой запрос (замените на ваш API endpoint)
          const response = await fetch('http://localhost:3000/orders');

          if (!response.ok) {
            throw new Error('Ошибка при загрузке заказов');
          }

          const orders = await response.json();
          commit('setOrders', orders);
        } catch (error) {
          console.error("Ошибка при загрузке заказов:", error);
        }
      },
      async createOrder({ commit }, { name, phone, adId, userId }) {
        try {
          const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phone, adId, userId })
          });

          if (!response.ok) {
            throw new Error('Ошибка при создании заказа');
          }

          const newOrder = await response.json();
          commit('createOrder', newOrder);
        } catch (error) {
          console.error("Ошибка при создании заказа:", error);
        }
      },
    },
    getters: {
      orders(state, getters, rootState) {
        const user = rootState.user.user;
        console.log("User:", user); // <-- Выведи в консоль объект user
        if (!user) return [];
        console.log("Orders before filter:", state.orders);
        // console.log("User ID:", user.id, typeof user.id);  Убери это, оно сейчас не нужно
        // console.log("User fields:", Object.keys(user));  Убери это, оно сейчас не нужно

        // Предположим, что поле с userId у тебя называется как-то иначе, например, uid
        const filteredOrders = state.orders.filter(order => {
          console.log("Order userId:", order.userId); // <-- Выведи userId текущего заказа
          // return String(order.userId) === String(user.id);  Убери это пока что

          // Покажи вообще все заказы.  Временно убираем фильтрацию, чтобы видеть все заказы.
          return true;
        });
        console.log("Orders after filter:", filteredOrders);
        return filteredOrders;
      }
    }
  };
