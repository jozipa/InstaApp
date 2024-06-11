<script>

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
        };
    },
    methods: {
        upload() {
            const fd = new FormData();
            fd.append("file", this.file);
            fd.append("album", this.album);
            this.$store.dispatch("POST_IMAGE_FILE", { file: fd, token: this.user.token });
            this.show = true;
            this.header = 'Add Tags'
            
        },
        handleFileUpload() {
            this.file = this.$refs.fileUpload.files[0];
        },
        closeDialog() {
            this.$emit('update:visible2', false);
            this.show = false;
            this.header = 'Add photo'
        },
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
            console.log('objekt return tagsssssssssssss',obj);
            return obj
        } 
    }
}
</script>

<template>
    <Dialog :visible.sync="visible2" modal :header="header"  :style="{ width: '25rem' }">
        <FileUpload  class="mb-2" v-show="!show" style="margin-left: 33%" ref="fileUpload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="upload" @change="handleFileUpload"/>
        <MultiSelect v-show="show" v-model="tags" :options="getTags" filter placeholder="Select Tags" class="w-full md:w-20rem mb-2" />
        <Button label="Cancel" text severity="danger" @click="closeDialog" autofocus />
        <Button v-show="show" label="Save" outlined severity="success" @click="saveChanges" autofocus />
    </Dialog>
</template>