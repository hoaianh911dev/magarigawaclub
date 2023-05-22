<template>
    <footer id="Footer">
        <nav class="navbar fixed-bottom navbar-dark bg-black py-10">
            <div class="mx-auto max-w-95% px-2 sm:px-6 lg:px-8">
                <div class="flex justify-between">
                    <FooterItem :nameItem=" $t('footer.home') " to="/" icon="fa-house" :active="footerActiveIndex === 1"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.calendar') " to="/" icon="fa-calendar-days"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.message') " to="/" icon="fa-message"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.notice') " to="/" icon="fa-bell"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.member') " to="/" icon="fa-address-card"></FooterItem>
                </div>
            </div>
        </nav>
    </footer>
</template>

<script lang="ts">

import FooterItem from './FooterItem.vue'

export default {
    components: {
        FooterItem
    },
    data() {
        return {
            footerActiveIndex: 0
        }
    },
    watch: {
        '$route.meta': {
            handler() {
                this.footerActiveIndex = this.$route.meta.footerActiveIndex
            }
        }
    }
}
</script>

<style lang="scss">
    @import "../../assets/scss/Footer.scss";
</style>