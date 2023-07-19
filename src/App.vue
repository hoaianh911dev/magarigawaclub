<script lang="ts">

import MainLayout from './layouts/MainLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import useLocalStorage from './hooks/useLocalStorage'
import { VueQueryDevTools } from 'vue-query/devtools'

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
        this.isUserLogined = useLocalStorage().user
    },
    mounted() {
        window.addEventListener('userstorage', () => {
            this.isUserLogined = useLocalStorage().user
        })
    },

}
</script>

<template>
 <MainLayout v-if="isUserLogined"></MainLayout>
 <AuthLayout v-else></AuthLayout>
 <VueQueryDevTools :initialIsOpen="true"></VueQueryDevTools>
</template>

<style scoped>
</style>
