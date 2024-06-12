<template>
    <div class="card">
        <Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
            <template #start>
                <div class="flex align-items-center gap-2">
                    <img style="height: 50px;" src="../assets/Instagram_logo.png">
                    <i class="fa-brands fa-instagram"></i>
                    <RouterLink to="/"><Button label="Home" text plain /></RouterLink>
                    <RouterLink to="/profile"><Button label="Profile" text plain /></RouterLink>
                </div>
            </template>

            <template #end>
                <div class="flex align-items-center gap-2">
                    <RouterLink to="/logout"><Button @click="logout">Logout</Button></RouterLink>
                    <Avatar image="" style="width: 32px; height: 32px" />
                </div>
            </template>
        </Toolbar>
    </div>
</template>

<script>
export default{
    methods: {
        logout(){
            this.$store.getters.DELETE_LOGIN_LIST;
        }
    }
}
</script>