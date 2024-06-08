<script>
import Menubar from 'primevue/menubar';
import AppLoader from '@/components/AppLoader.vue'
import  Header  from '@/components/Header.vue';
import { Button } from 'ant-design-vue';
export default{
    data(){
        return {
            file: null,
            album: "",
            user: {},
        };
    },
    created() {
        this.user = this.$store.getters.GET_LOGIN_LIST;
        this.$store.dispatch("FETCH_PHOTOS", this.user);
        this.album = this.user.userName
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
        upload() {
            const fd = new FormData()
            fd.append("file", this.file)
            fd.append("album", this.album)
            let data = this.user
            console.log('upload function:', this.file, this.user.token); // Dodaj to
            this.$store.dispatch("POST_IMAGE_FILE", { file: fd, token: this.user.token }) // Poprawione przekazanie tokena
        },
        handleFileUpload() {
            this.file = this.$refs.fileUpload.files[0];
        },
    },
    components: {AppLoader, Header}
}
</script>

<template>
    <Header></Header>
    <AppLoader v-show="photosLoading"></AppLoader>
    <FileUpload ref="fileUpload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="upload" @change="handleFileUpload" />
 <div v-for="photo in photosList"> 
        <p>photo {id: {{ photo.id }} }</p>
    </div>
    
</template>

<style>


</style>