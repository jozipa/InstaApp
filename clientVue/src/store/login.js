import { loginUser } from "@/api";

const login = {
    //state
    state() {
        return {
            loginInfo: [],
            loginLoading: false,
            loginError: null,
        };
    },

    //mutations czyli setters
    mutations: {
        SET_LOGIN_LIST(state, newlogin) {
            state.loginInfo = newlogin;
        },
        SET_LOGIN_LOADING(state, newlogin) {
            state.loginLoading = newlogin;
        },
        SET_LOGIN_ERROR(state, newlogin) {
            state.loginError = newlogin;
        },
    },

    //getters
    getters: {
        GET_LOGIN_LIST(state) {
            return state.loginInfo;
        },
        GET_LOGIN_LOADING(state) {
            return state.loginLoading;
        },
        GET_LOGIN_ERROR(state) {
            return state.loginError;
        },
    },

    // tu zapytania do serwera z pomocą naszego api
    actions: {
        POST_LOGIN_USER({ state, commit }, user) {
            // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)

            commit("SET_LOGIN_LOADING", true);

            // potem wywołujemy funkcję z api, która
            // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store
            // w razie błędu ustawia error w store (catch)
            // niezależnie od błędu lub jego braku (finally), kończy loading

            loginUser(user)
                .then((data) => {
                    commit("SET_LOGIN_LIST", data);
                    console.log("done", data);
                })
                .catch((error) => {
                    commit("SET_LOGIN_ERROR", "server error!!!");
                })
                .finally(() => {
                    commit("SET_LOGIN_LOADING", false);
                });
        },
    },
};

export default login;
