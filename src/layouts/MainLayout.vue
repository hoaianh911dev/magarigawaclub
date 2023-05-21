<template>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script lang="ts">
import Header from '../components/header/Header.vue';
import Footer from '../components/footer/Footer.vue';
export default {
    components: {
        Header,
        Footer
    }
}
</script>
