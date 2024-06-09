import { editProfile } from "@/api";

const profile = {
    //state
    state() {
        return {
            profileInfo: [],
            profileLoading: false,
            profileError: null,
        };
    },

    //mutations czyli setters
    mutations: {
        SET_PROFILE_LIST(state, newprofile) {
            state.profileInfo = newprofile;
        },
        SET_PROFILE_LOADING(state, newprofile) {
            state.profileLoading = newprofile;
        },
        SET_PROFILE_ERROR(state, newprofile) {
            state.profileError = newprofile;
        },
    },

    //getters
    getters: {
        GET_PROFILE_LIST(state) {
            return state.profileInfo;
        },
        GET_PROFILE_LOADING(state) {
            return state.profileLoading;
        },
        GET_PROFILE_ERROR(state) {
            return state.profileError;
        },
    },

    // tu zapytania do serwera z pomocą naszego api
    actions: {
        POST_PROFILE_UPDATE({ state, commit }, info) {
            // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)

            commit("SET_PROFILE_LOADING", true);

            // potem wywołujemy funkcję z api, która
            // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store
            // w razie błędu ustawia error w store (catch)
            // niezależnie od błędu lub jego braku (finally), kończy loading
            console.log('info in action', info);
            editProfile(info.info, info.token)
                .then((data) => {
                    commit("SET_PROFILE_LIST", data);
                    console.log("done", data);
                })
                .catch((error) => {
                    commit("SET_PROFILE_ERROR", "server error!!!");
                })
                .finally(() => {
                    commit("SET_PROFILE_LOADING", false);
                });
        },
    },
};

export default profile;
