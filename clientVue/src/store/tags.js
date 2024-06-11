import { getTagsArr } from "@/api";

const tags = {
    //state
    state() {
        return {
            tagsList: [],
            tagsLoading: false,
            tagsError: null,
        };
    },

    //mutations czyli setters
    mutations: {
        SET_TAGS_LIST(state, newtags) {
            state.tagsList = newtags;
        },
        SET_TAGS_LOADING(state, newtags) {
            state.tagsLoading = newtags;
        },
        SET_TAGS_ERROR(state, newtags) {
            state.tagsError = newtags;
        },
    },

    //getters
    getters: {
        GET_TAGS_LIST(state) {
            return state.tagsList;
        },
        GET_TAGS_LOADING(state) {
            return state.tagsLoading;
        },
        GET_TAGS_ERROR(state) {
            return state.tagsError;
        },
    },

    // tu zapytania do serwera z pomocą naszego api
    actions: {
        FETCH_TAGS({ state, commit }) {
            // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)
            commit("SET_TAGS_LOADING", true);

            // potem wywołujemy funkcję z api, która
            // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store
            // w razie błędu ustawia error w store (catch)
            // niezależnie od błędu lub jego braku (finally), kończy loading

            console.log('getTagsbefore');
            getTagsArr()
                .then((data) => {
                    commit("SET_TAGS_LIST", data);
                    console.log("done");
                })
                .catch((error) => {
                    commit("SET_TAGS_ERROR", "server error!!!");
                })
                .finally(() => {
                    commit("SET_TAGS_LOADING", false);
                });
        },
    },
};

export default tags;