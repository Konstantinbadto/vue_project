export default {
    state: {
        ads: [{
                title: "First",
                desc: "First Desc",
                promo: true,
                src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
                id: "1",
                userId: "1"
            },
            {
                title: "Second",
                desc: "Second Desc",
                promo: true,
                src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
                id: "2",
                userId: "1"
            },
            {
                title: "Third",
                desc: "Thitd Desc",
                promo: true,
                src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
                id: "3",
                userId: "1"
            },
            {
                title: "Fouth",
                desc: "Fouth Desc",
                promo: true,
                src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
                id: "4",
                userId: "1"
            }
        ]
    },
    mutations: {
		createAd(state, payload) {
		  console.log('Mutations: Payload перед добавлением в state.ads:', payload); // Добавляем лог
		  state.ads.push(payload);
		  console.log('Mutations: State.ads после добавления:', state.ads); // Добавляем лог
		}
	  },
    actions: {
		async createAd({ commit, rootGetters }, payload) {
		  payload.id = Math.random();
		  payload.userId = rootGetters.user ? rootGetters.user.id : '1';
		  console.log('Actions: Payload после добавления userId:', payload); // Добавляем лог
		  commit('clearError');
		  commit('setLoading', true);

		  // Имитация запроса на сервер
		  let isRequestOk = true;
		  let promise = new Promise(function(resolve) {
			setTimeout(() => resolve('Done'), 3000);
		  });

		  try {
			if (isRequestOk) {
			  await promise.then(() => {
				commit('createAd', payload);
				commit('setLoading', false);
			  });
			} else {
			  await promise.then(() => {
				commit('setLoading', false);
				commit('setError', 'Ошибка создания объявления');
				throw 'Упс... Ошибка создания объявления';
			  });
			}
		  } catch (error) {
			commit('setLoading', false);
			commit('setError', 'Ошибка создания объявления');
			console.error(error);
		  }
		}
	  },
    getters: {
        ads(state) {
            return state.ads;
        },
        promoAds(state) {
            return state.ads.filter(ad => ad.promo);
        },
        myAds(state, getters) {
			console.log('Getter myAds: state.ads:', state.ads);
			console.log('Getter myAds: user.id:', getters.user ? getters.user.id : null);
			const filteredAds = state.ads.filter(ad => {
			  console.log('Getter myAds: ad.userId:', ad.userId, 'ad.userId == getters.user.id:', ad.userId == (getters.user ? getters.user.id : null));
			  return ad.userId == (getters.user ? getters.user.id : null);
			});
			console.log('Getter myAds: filteredAds:', filteredAds);
			return filteredAds;
		  },
        adById(state) {
            return id => {
                return state.ads.find(ad => ad.id == id);
            };
        }
    }
};
