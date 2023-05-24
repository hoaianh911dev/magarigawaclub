<script lang="ts">

import MainLayout from './layouts/MainLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

export default {
    components: {
        MainLayout,
        AuthLayout
    },
    data() {
        return {
            isUserLogined: false
        }
    },
    created() {
        this.isUserLogined = JSON.parse(localStorage.getItem('user'))
    },
    mounted() {
        window.addEventListener('storage', () => {
            this.isUserLogined = JSON.parse(localStorage.getItem('user'))
        })
    },

}
</script>

<template>
 <MainLayout v-if="isUserLogined"></MainLayout>
 <AuthLayout v-else></AuthLayout>
</template>

<style scoped>
</style>
