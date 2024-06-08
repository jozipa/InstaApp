<template>
    <div>
        <img id="loader" src="/src/assets/loader.gif">
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
}
</script>

<style>
#loader{
    width: 128px;
    height: 128px;
    position: absolute;
    margin-left: -64px;
    margin-top: -64px;
    top: 50%;
    left: 50%;
}
</style>