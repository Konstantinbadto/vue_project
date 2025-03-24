class User {
    constructor(id, email) { // Удален password
      this.id = id;
      this.email = email;
    }
  }

  export default {
    state: {
      user: null,
      loading: false,
      error: null,
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload;
      },
      setLoading(state, payload) {
        state.loading = payload;
      },
      setError(state, payload) {
        state.error = payload;
      },
      clearError(state) {
        state.error = null;
      },
    },
    actions: {
      logoutUser({commit}) {
        commit('setUser', null)
        },
      async registerUser({ commit }, { email, password }) {
        commit('clearError');
        commit('setLoading', true);

        try {
          const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
              const isSuccess = Math.random() > 0.5; // Имитация успеха/неудачи (50/50)
              if (isSuccess) {
                resolve(); // Успех
              } else {
                reject(new Error('Ошибка регистрации')); // Неудача
              }
            }, 3000); // 3 секунды задержки
          });

          await promise; // Ожидаем завершения promise
          commit('setUser', new User(1, email));

        } catch (error) {
          commit('setError', error.message);
        } finally {
          commit('setLoading', false);
        }

      },
      async loginUser({ commit }, { email, password }) {
        commit('clearError');
        commit('setLoading', true);

        try {
          const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
              const isSuccess = Math.random() > 0.5; // Имитация успеха/неудачи (50/50)
              if (isSuccess) {
                resolve(Math.floor(Math.random() * 100)); // Успех, возвращаем рандомный id
              } else {
                reject(new Error('Ошибка логина')); // Неудача
              }
            }, 3000); // 3 секунды задержки
          });

          const userId = await promise; // Ожидаем завершения promise и получаем id
          commit('setUser', new User(userId, email));

        } catch (error) {
          commit('setError', error.message);
        } finally {
          commit('setLoading', false);
        }

      }
    },
    getters: {
      isUserLoggedIn(state) {
        return state.user !== null;
      },
      user(state) {
        return state.user ? state.user.id : null;
      },
    },
  };
