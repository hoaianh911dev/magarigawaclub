<template>
    <router-link class="border-0 btn btn-outline-primary item-link" :class="{'active': active}"
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
        active: Boolean
    }
}
</script>

<style lang="scss">
    @import "../../assets/scss/Footer.scss";
</style>