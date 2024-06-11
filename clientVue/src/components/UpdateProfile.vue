<script>
import { descriptionsContext } from 'ant-design-vue/es/descriptions';

export default {
    props: {
        visible: Boolean
    },
    data() {
        return {
            file: null,
            album: "",
            user: {},
            name: "",
            lastname: "",
            descritption: "",
            show: false,
            info: "",
        };
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
        closeDialog() {
            this.$emit('update:visible', false);
        },
        saveChanges() {
            let info = {
                name: this.name,
                lastname: this.lastname,
                description: this.description
            }
            this.$store.dispatch("POST_PROFILE_UPDATE", { info: info, token: this.user.token }) 
            setTimeout(() => {
                this.$store.dispatch("GET_CURRENT_USER", { email: this.user.userInfo.email, token: this.user.token });
                let obj = this.$store.getters.GET_PROFILE_LIST
                this.info = obj.info;
                this.show = true;
                if(obj.type == 'success'){
                    this.show = false;
                    this.closeDialog();
                }
                return obj;
            }, 2500);
            
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
        } 
    }
}
</script>

<template>
    <Dialog :visible.sync="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <template #header>
            <div class="inline-flex align-items-center justify-content-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
                <span class="font-bold white-space-nowrap">{{ getUserInfo.name }} {{ getUserInfo.lastname }}</span>
            </div>
        </template>
        <span class="p-text-secondary block mb-5">Update your information.</span>
        <Message :closable="false" v-show="show" position="top-center"
            severity="error">
            {{ info }}
        </Message>
        <div class="flex align-items-center gap-3 mb-3">
            <label for="username" class="font-semibold w-6rem">Name</label>
            <InputText v-model="name" id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-2">
            <label for="email" class="font-semibold w-6rem">Lastname</label>
            <InputText v-model="lastname" id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-2">
            <label for="email" class="font-semibold w-6rem">Description</label>
            <InputText v-model="description" id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-2">
            <label for="email" class="font-semibold w-6rem">Profile Picture</label>
            <FileUpload ref="fileUpload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="upload" @change="handleFileUpload"/>
        </div>
        <template #footer>
            <Button label="Cancel" text severity="secondary" @click="closeDialog" autofocus />
            <Button label="Save" outlined severity="success" @click="saveChanges" autofocus />
        </template>
    </Dialog>
</template>
