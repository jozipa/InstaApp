import { getPhotos } from "@/api";

const photos = {
  //state
  state() {
    return {
      photosList: [],
      photosLoading: false,
      photosError: null,
    };
  },

  //mutations czyli setters
  mutations: {
    SET_PHOTOS_LIST(state, newphotos) {
      console.log("newphotos", newphotos, state.photosLIst);
      state.photosList = newphotos;
    },
    SET_PHOTOS_LOADING(state, newphotos) {
      state.photosLoading = newphotos;
    },
    SET_PHOTOS_ERROR(state, newphotos) {
      state.photosError = newphotos;
    },
  },

  //getters
  getters: {
    GET_PHOTOS_LIST(state) {
      return state.photosList;
    },
    GET_PHOTOS_LOADING(state) {
      return state.photosLoading;
    },
    GET_PHOTOS_ERROR(state) {
      return state.photosError;
    },
  },

  // tu zapytania do serwera z pomocą naszego api
  actions: {
    FETCH_PHOTOS({ state, commit }) {
      // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)

      commit("SET_PHOTOS_LOADING", true);

      // potem wywołujemy funkcję z api, która
      // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store
      // w razie błędu ustawia error w store (catch)
      // niezależnie od błędu lub jego braku (finally), kończy loading

      getPhotos()
        .then((data) => {
          commit("SET_PHOTOS_LIST", data);
          console.log("done");
        })
        .catch((error) => {
          commit("SET_PHOTOS_ERROR", "server error!!!");
        })
        .finally(() => {
          commit("SET_PHOTOS_LOADING", false);
        });
    },
  },
};

export default photos;
