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
            isUserLogined: false
        }
    },

    created() {
        this.isUserLogined = JSON.parse(localStorage.getItem('user'))
        this.loadRouter()
    },
    mounted() {
        window.addEventListener('storage', () => {
            this.loadRouter()
        })
    },
    methods: {
        loadRouter() {
            this.isUserLogined = JSON.parse(localStorage.getItem('user'))
            if (this.isUserLogined) {
                this.$router.push(PATH.home.url)
            } else {
                this.$router.push(PATH.login.url)
            }
        }
    }
}
</script>

<template>
 <MainLayout v-if="isUserLogined"></MainLayout>
 <AuthLayout v-else></AuthLayout>
</template>

<style scoped>
</style>
