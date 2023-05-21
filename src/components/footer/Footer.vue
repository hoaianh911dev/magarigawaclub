<template>
    <footer id="Footer">
        <nav class="navbar fixed-bottom navbar-dark bg-black py-10">
            <div class="mx-auto max-w-95% px-2 sm:px-6 lg:px-8">
                <div class="flex justify-between">
                    <FooterItem :nameItem=" $t('footer.home') " to="/" icon="fa-house" className="item-link"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.calendar') " to="/" icon="fa-calendar-days" className="item-link"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.message') " to="/" icon="fa-message" className="item-link"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.notice') " to="/" icon="fa-bell" className="item-link"></FooterItem>
                    <FooterItem :nameItem=" $t('footer.member') " to="/" icon="fa-address-card" className="item-link"></FooterItem>
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
    }
}
</script>

<style lang="scss">
    @import "../../assets/scss/Footer.scss";
</style>