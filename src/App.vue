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
            isUserLogined: false,
            isAuthencation: false
        }
    },

    watch: {
        '$route.meta': {
            handler() {
                this.isAuthencation = this.$route.meta.isAuthencation
            }
        }
    },

    created() {
        this.isUserLogined = JSON.parse(localStorage.getItem('user'))
        this.loadRouter()
    },
    mounted() {
        window.addEventListener('storage', () => {
            this.isUserLogined = JSON.parse(localStorage.getItem('user'))
        })
    },
    methods: {
        loadRouter() {
            if(this.isAuthencation) {
                this.isUserLogined = JSON.parse(localStorage.getItem('user'))
                if (this.isUserLogined) {
                    this.$router.push(PATH.home.url)
                } else {
                    this.$router.push(PATH.login.url)
                }
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
