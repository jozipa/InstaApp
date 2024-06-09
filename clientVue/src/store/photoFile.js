import { getPhoto } from "@/api";
import login from "./login";

const photo = {
  //state
  state() {
    return {
      photoList: [],
      photoLoading: false,
      photoError: null,
    };
  },

  //mutations czyli setters
  mutations: {
    SET_PHOTO_LIST(state, newphotos) {
      state.photoList = newphotos;
    },
    SET_PHOTO_LOADING(state, newphotos) {
      state.photoLoading = newphotos;
    },
    SET_PHOTO_ERROR(state, newphotos) {
      state.photoError = newphotos;
    },
  },

  //getters
  getters: {
    GET_PHOTO_FILE(state) {
      return state.photoList;
    },
    GET_PHOTO_LOADING(state) {
      return state.photoLoading;
    },
    GET_PHOTO_ERROR(state) {
      return state.photoError;
    },
  },

  // tu zapytania do serwera z pomocą naszego api
  actions: {
    FETCH_PHOTO({ state, commit }, id) {
      // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)
      commit("SET_PHOTO_LOADING", true);
      
      // potem wywołujemy funkcję z api, która
      // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store
      // w razie błędu ustawia error w store (catch)
      // niezależnie od błędu lub jego braku (finally), kończy loading
      console.log('fetchad',id);
      getPhoto(id)
        .then((data) => {
          commit("SET_PHOTO_LIST", data);
          console.log("done");
        })
        .catch((error) => {
          commit("SET_PHOTO_ERROR", "server error!!!");
        })
        .finally(() => {
          commit("SET_PHOTO_LOADING", false);
        });
    },
  },
};

export default photo;
