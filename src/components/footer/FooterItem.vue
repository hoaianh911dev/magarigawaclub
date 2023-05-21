<template>
    <router-link class="border-0 btn btn-outline-primary" :className="className"
        :to="to">
        <font-awesome-icon :icon="['fa-solid', icon]" class="text-17"/>
        <br>
        <span class="title">{{ nameItem }}</span>
    </router-link>
</template>

<script lang="ts">
export default {
    props: {
        nameItem: String,
        to: String,
        icon: String,
        className: String
    }
}
</script>

<style lang="scss">
    @import "../../assets/scss/Footer.scss";
</style>