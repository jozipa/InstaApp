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
            photoId: null,
        };
    },
    created() {
        this.user = this.$store.getters.GET_LOGIN_LIST;
        if(this.user.token == undefined){
            this.$router.push('/login')
            return
            }
        

        this.$store.dispatch("FETCH_PHOTOS", this.user);
        this.album = this.user.album
    },
    computed: {
        photosList() {
            console.log(this.$store.getters.GET_PHOTOS_LIST);
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
        <div class="card-center" v-for="photo in photosList">
            <Card style="width: 50%; overflow: hidden" class="m-3">
                <template #header>
                    <div class="flex align-items-center">
                        <Avatar class="m-3" image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
                        <div>{{ photo.album }}</div>
                    </div>
                </template>
                <template #content>
                    <div class="card flex justify-content-center">
                        <Image v-bind:src="'http://localhost:3000/api/getimage/' + photo.id" alt="Image" width="100%" preview />
                    </div>
                    <p class="mt-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quibusdam enim qui consequatur nemo reiciendis vitae itaque. Ex natus numquam praesentium voluptate ad est, debitis iste assumenda ducimus tenetur. Facere. 
                    </p>
                </template>
                <template #footer>
            
        
                </template>
            </Card>

        </div>
        
        
        
    </div>
    
</template>

<style>
#main {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.card-center{
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>