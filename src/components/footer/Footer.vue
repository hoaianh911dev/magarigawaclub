<template>
    <footer id="Footer" class="fixed-bottom">
        <nav class="navbar navbar-dark bg-black py-10">
            <div class="mx-auto max-w-95% px-2 sm:px-6 lg:px-8">
                <div class="flex justify-between">
                    <FooterItem :nameItem=" $t('footer.home') " :to="PATH.home.url" icon="fa-house" :active="footerActiveIndex === 1"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.calendar') " :to="PATH.bookingConfirm.url" icon="fa-calendar-days" :active="footerActiveIndex === 2"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.message') " to="/" icon="fa-message" :active="footerActiveIndex === 3"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.notice') " to="/" icon="fa-bell" :active="footerActiveIndex === 4"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.member') " to="/" icon="fa-address-card" :active="footerActiveIndex === 5"></FooterItem>
                </div>
            </div>
        </nav>
    </footer>
</template>

<script lang="ts">

import FooterItem from './FooterItem.vue'
import { PATH } from '../../constants/path'

export default {
    components: {
        FooterItem
    },
    data() {
        return {
            footerActiveIndex: 0,
            PATH: PATH
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