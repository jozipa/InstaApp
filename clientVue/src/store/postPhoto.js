import { postFile } from "@/api";

const upload = {
    //state
    state() {
        return {
            uploadLoading: false,
            uploadError: null,
        };
    },

    //mutations czyli setters
    mutations: {
        SET_UPLOAD_LOADING(state, newupload) {
            state.uploadLoading = newupload;
        },
        SET_UPLOAD_ERROR(state, newupload) {
            state.uploadError = newupload;
        },
    },

    //getters
    getters: {
        GET_UPLOAD_LOADING(state) {
            return state.uploadLoading;
        },
        GET_UPLOAD_ERROR(state) {
            return state.uploadError;
        },
    },

    // tu zapytania do serwera z pomocą naszego api
    actions: {
        POST_IMAGE_FILE({ state, commit }, obj) {
            // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)

            commit("SET_UPLOAD_LOADING", true);

            // potem wywołujemy funkcję z api, która
            // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store
            // w razie błędu ustawia error w store (catch)
            // niezależnie od błędu lub jego braku (finally), kończy loading
            console.log('postimage store' ,obj.file, obj.token);
            postFile(obj.file, obj.token)
                .catch((error) => {
                    commit("SET_UPLOAD_ERROR", "server error!!!");
                })
                .finally(() => {
                    commit("SET_UPLOAD_LOADING", false);
                });
        },
    },
};

export default upload;
