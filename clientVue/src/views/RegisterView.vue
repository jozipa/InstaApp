<script>
import Message from 'primevue/message';

export default {
    data() {
        return {
            name: '',
            lastname: '',
            password1: "",
            password2: "",
            email: '',
            info: '',
            show: false,
            type: 'error'
        }
    },
    methods: {
        onSubmit() {
            if (this.password1 == this.password2) {
                let user = {
                    name: this.name,
                    lastName: this.lastname,
                    email: this.email,
                    password: this.password1
                }
                this.$store.dispatch("POST_NEW_USER", user)
            } else {
                this.info = "The passwords do not match.";
                this.type = 'error';
                this.show = true;
                setTimeout(() => {
                    this.show = false;
                }, 4000);
            }
        },

    },
    computed: {
        disabled() {
            let disable = true;
            if (this.email.length > 2 && this.password1.length > 2) disable = false
            return disable;
        },
        getConfirmation() {
            return this.$store.getters.GET_REGISTER_LIST;
        }
    },
};
</script>

<template>
<div class="container">
    
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Register</div>
            <span class="text-600 font-medium line-height-3">Already have an account?</span>
            <RouterLink to="/login" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">login now!
            </RouterLink>
        </div>
        <a v-bind:href="getConfirmation.link" target="_blank">
            <Message id="message13" :closable="false" v-show="getConfirmation.type" position="top-center"
                v-bind:severity="getConfirmation.type">
                {{ getConfirmation.info }}
            </Message>
        </a>
        <div>
            <Message :closable="false" v-bind:severity="type" v-show="show">{{ info }}</Message>

            <label for="email" class="block text-900 font-medium mb-2">Email</label>
            <InputText v-model="email" id="email" type="text" class="w-full mb-3" />

            <label for="name" class="block text-900 font-medium mb-2">Name</label>
            <InputText v-model="name" id="name" type="text" class="w-full mb-3" />

            <label for="lastname" class="block text-900 font-medium mb-2">Last name</label>
            <InputText v-model="lastname" id="lastname" type="text" class="w-full mb-3" />

            <label for="password1" class="block text-900 font-medium mb-2">Password</label>
            <InputText v-model="password1" id="password1" type="password" class="w-full mb-3" />

            <label for="password2" class="block text-900 font-medium mb-2">Confirm password</label>
            <InputText v-model="password2" id="password2" type="password" class="w-full mb-3" />


            <div class="flex align-items-center justify-content-between mb-6">
                <div class="flex align-items-center">
                    <Checkbox id="rememberme1" class="mr-2"></Checkbox>
                    <label for="rememberme1">Remember me</label>
                </div>
                <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
            </div>
            <Button :disabled="disabled" @click="onSubmit" label="Sign In" icon="pi pi-user" class="w-full"></Button>

        </div>
    </div>
</div>
</template>

<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
#message13 {
    text-wrap: wrap;
}
</style>