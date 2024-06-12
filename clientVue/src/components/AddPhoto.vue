<script>
import AppLoader from '@/components/AppLoader.vue'
import { patchTags } from '@/api';
export default {
    props: {
        visible2: Boolean,
    },
    data() {
        return {
            file: null,
            album: "",
            user: {},
            show: false,
            info: "",
            header: "Add Photo",
            tags: [],
            id: 1,
        };
    },
    methods: {
        upload() {
            const fd = new FormData();
            fd.append("file", this.file);
            fd.append("album", this.album);
            this.$store.dispatch("POST_IMAGE_FILE", { file: fd, token: this.user.token });
            this.getUploadStatus()
        },
        handleFileUpload() {
            this.file = this.$refs.fileUpload.files[0];
        },
        closeDialog() {
            this.$emit('update:visible2', false);
            this.show = false;
            this.header = 'Add photo'
        },
        getUploadStatus(){
            setTimeout(() => {
                let upload = this.$store.getters.GET_UPLOAD_INFO
                this.$store.getters.RESET_UPLOAD_INFO
                if(upload.id != undefined){
                    this.header = 'Add Tags'
                    this.show = true
                    this.id = upload.id;
                }
            }, 2005);
        },
        saveChanges(){
            let arr = [];
            console.log(this.tags[0]);
            for(let i = 0; i < this.tags.length; i++){
                arr.push(this.tags[i])
            }
            let obj = {id: this.id, tags: arr}
            let dupa = patchTags(obj)
            this.closeDialog()
        }
    },
    created() {
        let obj = this.$store.getters.GET_LOGIN_LIST;
        this.user = obj;
        this.album = this.user.userName;
    },
    computed: {
        getUserInfo(){
            let obj = this.$store.getters.GET_CURRENT_USER;
            this.album = obj.album;
            return obj
        },
        getTags(){
            let obj = this.$store.getters.GET_TAGS_LIST;
            return obj
        },
        getLoading(){
            let loader = this.$store.getters.GET_UPLOAD_LOADING
            return loader
        },
    },
    components: {AppLoader}
}
</script>

<template>
    <AppLoader v-show="getLoading"></AppLoader>
    <Dialog :visible.sync="visible2" modal :header="header"  :style="{ width: '25rem' }">
        <div style="width: 100%; display: flex;justify-content: center; align-items: center;">
            <div>
                <FileUpload  class="mb-2" v-show="!show" ref="fileUpload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="upload" @change="handleFileUpload"/>
                <MultiSelect v-show="show" v-model="tags" :options="getTags" filter placeholder="Select Tags" class="w-full md:w-20rem mb-2" />
            </div>
        </div>
        
        <Button label="Cancel" text severity="danger" @click="closeDialog" autofocus />
        <Button v-show="show" label="Save" outlined severity="success" @click="saveChanges" autofocus />
    </Dialog>
</template>