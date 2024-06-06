<script>
import Menubar from 'primevue/menubar';

export default{
    data(){
        return{
            
        }
    },
    created() {
        console.log('home');
        this.$store.dispatch("FETCH_PHOTOS");
    },
    computed: {
        photosList() {
            console.log('phtoslist',this.$store.getters.GET_PHOTOS_LIST);
            return this.$store.getters.GET_PHOTOS_LIST;
        }
    },
    methods: {
        
    }
}
</script>

<template>
    <RouterLink to="/login"><Button>Login</Button></RouterLink>
    <FileUpload class="mt-5 mb-5" accept="image/*" />
    <div v-for="photo in photosList">
        <p>photo {id: {{ photo.id }} }</p>
    </div>
</template>

<style>

</style>