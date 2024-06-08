<script>
import Menubar from 'primevue/menubar';
import AppLoader from '@/components/AppLoader.vue'
export default{
    data(){
        return {
            file: null,
            album: "",
        };
    },
    created() {
        let user = this.$store.getters.GET_LOGIN_LIST;
        this.$store.dispatch("FETCH_PHOTOS", user);
        this.album = user.userName
    },
    computed: {
        photosList() {
            return this.$store.getters.GET_PHOTOS_LIST;
        },
        photosLoading() {
            return this.$store.getters.GET_PHOTOS_LOADING;
        }
    },
    methods: {
        upload(){
            console.log(this.album);
        }
    },
    components: {AppLoader}
}
</script>

<template>
    <AppLoader v-show="photosLoading"></AppLoader>
    <RouterLink to="/login"><Button>Login</Button></RouterLink>
    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="upload" />
    <div v-for="photo in photosList">
        <p>photo {id: {{ photo.id }} }</p>
    </div>
</template>

<style>

</style>