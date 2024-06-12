import { postFile } from "@/api";

const upload = {
    //state
    state() {
        return {
            uploadInfo: [],
            uploadLoading: false,
            uploadError: null,
        };
    },

    //mutations czyli setters
    mutations: {
        SET_UPLOAD_INFO(state, newupload) {
            state.uploadInfo = newupload
        },
        SET_UPLOAD_LOADING(state, newupload) {
            state.uploadLoading = newupload;
        },
        SET_UPLOAD_ERROR(state, newupload) {
            state.uploadError = newupload;
        },
    },

    //getters
    getters: {
        RESET_UPLOAD_INFO(state, newupload) {
            state.uploadInfo = [];
        },
        GET_UPLOAD_INFO(state) {
            return state.uploadInfo
        },
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
            postFile(obj.file, obj.token)
                .then((data) => {
                    commit("SET_UPLOAD_INFO", data);
                })
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
