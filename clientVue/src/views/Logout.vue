<script>

export default{
    created() {
        let user = this.$store.getters.GET_LOGIN_LIST;
        if(user.token == undefined){
            this.$router.push('/login')
            return
        }
    },
}
</script>

<template>

    
</template>

<style>

</style>