<template>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script lang="ts">
import Header from '../components/header/Header.vue';
export default {
    components: {
        Header
    }
}
</script>
