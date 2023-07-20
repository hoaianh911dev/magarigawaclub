<template>
    <header id="Header" class="fixed-top">
        <nav class="navbar  bg-black">
            <div class="mx-auto max-w-95% px-2 sm:px-6 lg:px-8">
                <div class="relative flex justify-between items-center h-56">
                    <a class="absolute inset-y-0 btnBack items-center flex" @click="$router.go(-1)" v-if="isBtnBack">
                        <i class="fa-solid fa-chevron-left"></i>
                    </a>
                    <div class="flex-1 flex justify-center">
                        <router-link  to="/">
                        <img width="150" class="m-auto" src="/img/logo.svg" alt="Magarigawa">
                    </router-link>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center">
                        <button class="flex" type="button" ref="dropdown"
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
                    :to="PATH.tripBook.url" @handleClick="closeDropdown"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.bookingConfirm')"
                    :to="PATH.tripConfirm.url" @handleClick="closeDropdown"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.usageHistory')"
                    :to="PATH.tripHistory.url" @handleClick="closeDropdown"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.calendar')"
                    :to="PATH.bookingConfirm.url" @handleClick="closeDropdown"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.notice')"
                    :to="PATH.notice.url" @handleClick="closeDropdown"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.mypage')"
                    :to="PATH.myPage.url" @handleClick="closeDropdown"></DropdownItem>
                    <DropdownItem :nameItem="$t('header.logout')"
                    :to="PATH.login.url" @handleClick="logout"></DropdownItem>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
//layout
import DropdownItem from './DropdownItem.vue'
//const
import { PATH } from '../../constants/path'
//hooks
import useLocalStorage from '../../hooks/useLocalStorage'

export default {
    name: 'Header',
    components: {
        DropdownItem
    },
    props: {
        isBtnBack: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            showDropdown: false,
            PATH: PATH
        }
    },

    methods: {
        logout() {
            this.showDropdown = false
            useLocalStorage().removeUser()
        },
        closeDropdown() {
            this.showDropdown = false
        }
    },

}
</script>

<style lang="scss">
    @import "../../assets/scss/Header.scss";
</style>