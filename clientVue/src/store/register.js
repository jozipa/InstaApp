import { registerUser } from "@/api";

const register = {
    //state
    state() {
        return {
            registerInfo: [],
            registerLoading: false,
            registerError: null,
        };
    },

    //mutations czyli setters
    mutations: {
        SET_REGISTER_LIST(state, newregister) {
            state.registerInfo = newregister;
        },
        SET_REGISTER_LOADING(state, newregister) {
            state.registerLoading = newregister;
        },
        SET_REGISTER_ERROR(state, newregister) {
            state.registerError = newregister;
        },
    },

    //getters
    getters: {
        GET_REGISTER_LIST(state) {
            return state.registerInfo;
        },
        GET_REGISTER_LOADING(state) {
            return state.registerLoading;
        },
        GET_REGISTER_ERROR(state) {
            return state.registerError;
        },
    },

    // tu zapytania do serwera z pomocą naszego api
    actions: {
        POST_NEW_USER({ state, commit }, user) {
            // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)

            commit("SET_REGISTER_LOADING", true);

            // potem wywołujemy funkcję z api, która
            // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store
            // w razie błędu ustawia error w store (catch)
            // niezależnie od błędu lub jego braku (finally), kończy loading

            registerUser(user)
                .then((data) => {
                    commit("SET_REGISTER_LIST", data);
                    console.log("done", data);
                })
                .catch((error) => {
                    commit("SET_REGISTER_ERROR", "server error!!!");
                })
                .finally(() => {
                    commit("SET_REGISTER_LOADING", false);
                });
        },
    },
};

export default register;
