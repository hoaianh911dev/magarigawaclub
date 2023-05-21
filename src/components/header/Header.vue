<template>
    <header id="Header">
        <nav class="navbar fixed-top bg-black">
            <div class="mx-auto max-w-95% px-2 sm:px-6 lg:px-8">
                <div class="relative flex justify-between items-center h-56">
                    <a class="absolute inset-y-0 btnBack items-center flex" @click="$router.go(-1)">
                        <i class="fa-solid fa-chevron-left"></i>
                    </a>
                    <router-link class="flex-1 flex justify-between" to="/#">
                        <img width="150" class="m-auto" src="/img/logo.svg" alt="Magarigawa">
                    </router-link>
                    <div class="absolute inset-y-0 right-0 flex items-center">
                        <button class="flex" type="button"
                        @click="showDropdown = !showDropdown">
                            <font-awesome-icon :icon="['fa-solid', 'fa-bars']" class="text-20" v-if="!showDropdown"/>
                            <font-awesome-icon :icon="['fa-solid', 'fa-xmark']" class="text-20" v-else/>
                        </button>
                    </div>
                </div>
            </div>
            <div v-show="showDropdown" class="dropdown_menu">
                <ul class="navbar-nav ms-auto p-20">
                    <DropdownItem :nameItem="$t('header.book')"
                    to="/31"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.bookingConfirm')"
                    to="/31"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.usageHistory')"
                    to="/31"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.calendar')"
                    to="/31"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.notice')"
                    to="/31"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.mypage')"
                    to="/31"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.logout')"
                    to="/31"></DropdownItem>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import DropdownItem from './DropdownItem.vue'
export default {
    name: 'Header',
    components: {
        DropdownItem
    },

    data() {
        return {
            showDropdown: false,
        }
    }

}
</script>

<style lang="scss">
    @import "../../assets/scss/Header.scss";
</style>