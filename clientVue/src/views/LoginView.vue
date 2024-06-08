<script>
import Message from 'primevue/message';

export default {
    data() {
        return {
            email: '',
            password1: "",
            info: '',
            show: false,
            type: 'error'
        }
    },
    methods: {
        onSubmit() {
            let user = {
                email: this.email,
                password: this.password1
            }
            this.$store.dispatch("POST_LOGIN_USER", user) 
        },

    },
    computed: {
        disabled() {
            let disable = true;
            if (this.email.length > 2 && this.password1.length > 2) disable = false
            return disable;
        },
        getLoginInfo() {
            let loginList = this.$store.getters.GET_LOGIN_LIST
            if(loginList.type == 'success'){
                setTimeout(() => {
                    this.$router.push('/')
                }, 2000);
            }
            return loginList;
        }
        
    },
};
</script>

<template>
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <Message :closable="false" v-show="getLoginInfo.type" position="top-center"
            v-bind:severity="getLoginInfo.type">
            {{ getLoginInfo.info }}
        </Message>
        <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
            <span class="text-600 font-medium line-height-3">Don't have an account?</span>
            <RouterLink to="/register" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!
            </RouterLink>
        </div>
        <div>
            <label for="email" class="block text-900 font-medium mb-2">Email</label>
            <InputText v-model="email" id="email" type="text" class="w-full mb-3" />

            <label for="password" class="block text-900 font-medium mb-2">Password</label>
            <InputText v-model="password1" id="password" type="password" class="w-full mb-3" />

            <div class="flex align-items-center justify-content-between mb-6">
                <div class="flex align-items-center">
                    <Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>
                    <label for="rememberme1">Remember me</label>
                </div>
                <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
            </div>

            <Button @click="onSubmit" :disabled="disabled" label="Sign In" icon="pi pi-user" class="w-full"></Button>
        </div>
    </div>
</template>

<style>

</style>