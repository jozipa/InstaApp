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
    <div id="main">
            <Card style="width: 25rem; overflow: hidden" v-for="photo in photosList" class="m-3">
        <template #header>
            <div class="flex align-items-center">
                <Avatar class="m-3" image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
                <div>{{ user.userName }}</div>
            </div>
        </template>
        <template #content>
            <div class="card flex justify-content-center">
                <Image src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" width="100%" preview />
            </div>
            <p class="mt-3">
                {{ photo.id }} 
            </p>
        </template>
        <template #footer>
            
        
        </template>
    </Card>
        
        
    </div>
    
</template>

<style>
.main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>