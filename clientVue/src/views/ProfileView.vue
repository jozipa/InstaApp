<script>
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
        let obj = this.$store.getters.GET_LOGIN_LIST;
        this.user = obj.userInfo
        this.$store.dispatch("FETCH_PHOTOS", this.user);
        this.album = this.user.userName
        console.log(this.user);
    },
    computed: {
        
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
    <div class="flex">
        <Avatar id="profilePicture" class="m-3" image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
        <div class="flex flex-column">
            <div class="profileTile">
                <h1>{{ user.name }} {{ user.lastname }}</h1>
            </div>
            <div class="profileTile">
                email: {{ user.email }}
            </div>
            <div class="profileTile mt-2">
                posts: 3
            </div>
        </div>
    </div>
    <hr>

    <FileUpload ref="fileUpload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="upload" @change="handleFileUpload" />
    
</template>

<style>
#profilePicture {
   width: 200px; 
   height: 200px;
}


</style>