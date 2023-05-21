<script lang="ts">

import MainLayout from './layouts/MainLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

import { PATH } from './constants/path'

export default {
    components: {
        MainLayout,
        AuthLayout
    },
    data() {
        return {
            checkUserLogined: false
        }
    },
    created() {
        this.checkUserLogined = JSON.parse(localStorage.getItem('user'))
        if (!this.checkUserLogined) {
            this.$router.push(PATH.login.url)
        } 

     },
}
</script>

<template>
 <MainLayout v-if="checkUserLogined"></MainLayout>
 <AuthLayout v-else></AuthLayout>
</template>

<style scoped>
</style>
