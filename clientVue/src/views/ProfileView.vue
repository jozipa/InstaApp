<script>
import AppLoader from '@/components/AppLoader.vue'
import Header from '@/components/Header.vue';
import { Button } from 'ant-design-vue';
import EditUser from '@/components/UpdateProfile.vue'

export default {
    data() {
        return {
            file: null,
            album: "",
            user: {userInfo: {lastname: 'asdad'}, name: ''},
            visible: false,

        };
    },
    created() {
        let obj = this.$store.getters.GET_LOGIN_LIST;
        if(obj.token == undefined){
            this.$router.push('/login')
            return
        }
        this.user = obj;
        this.$store.dispatch("GET_CURRENT_USER", { email: this.user.userInfo.email, token: this.user.token });
        this.$store.dispatch("FETCH_PHOTOS", obj);
        this.album = this.user.userName;
    },
    methods: {
        upload() {
            const fd = new FormData();
            fd.append("file", this.file);
            fd.append("album", this.album);
            this.$store.dispatch("POST_IMAGE_FILE", { file: fd, token: this.user.token });
        },
        handleFileUpload() {
            this.file = this.$refs.fileUpload.files[0];
        },
        openDialog() {
            console.log(this.visible);
            this.visible = true;
        },
        closeDialog() {
            this.visible = false;
        }
    },
    computed: {
        getUserInfo(){
            let obj = this.$store.getters.GET_CURRENT_USER;
            this.album = obj.album;
            return obj
        },
        getUserPhotos(){
            let photos = this.$store.getters.GET_PHOTOS_LIST
            let dupa = [];
            for (let i = 0; i < photos.length; i++) {
                if(photos[i].album == this.album){
                    dupa.push(photos[i])
                }            
            }
            return dupa
        } 
    },
    components: { AppLoader, Header, EditUser }
}
</script>

<template>
    <EditUser v-model:visible="visible"></EditUser>
    <Header></Header>
    <div class="flex" style="width: 80%;margin-left: 20%;">
        <Avatar id="profilePicture" class="m-3" image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
        <div class="flex flex-column">
            <div class="flex align-items-center">
                <h1>{{ getUserInfo.name }} {{ getUserInfo.lastname }}</h1><Button class="ml-2" @click="openDialog">Edit Profile</Button>
            </div>
            <div class="profileTile">
                email: {{ user.userInfo.email }}
            </div>
            <div class="profileTile mt-2">
                posts: {{getUserPhotos.length}}
            </div>
            <div class="profileTile mt-2">
                {{ getUserInfo.description }}
            </div>
            <div class="flex mt-2 align-items-center">
                <Button>Add new photo</Button>
            </div>
        </div>
    </div>    
        <hr>
        <div class="flex flex-direction-row flex-wrap" style="width: 80%;margin-left: 20%;">
            <div v-for="photo in getUserPhotos" class="gallery">
            <Image class="profile-photo-gallery" v-bind:src="'http://localhost:3000/api/getimage/' + photo.id" alt="Image" style="max-height: 350px; max-width: 350px;"/>
            </div>
        </div>
        


</template>

<style>
#profilePicture {
    width: 200px;
    height: 200px;
}
.card-row{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 30%;
}
div.gallery {
  margin: 5px;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: var(--primary-color);
  border-radius: 10px;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  height: auto;
}

</style>
