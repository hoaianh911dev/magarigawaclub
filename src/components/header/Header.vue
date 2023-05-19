<template>
    <header id="Header">
        <nav class="navbar fixed-top navbar-dark bg-black">
            <div class="container-fluid p-2 header-content">
                <div class="btnBack" @click="$router.go(-1)"> &lt; </div>
                <div class="btnMenu">
                    <button class="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around ms-auto"
                    type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation"
                    @click="clearActive()">
                    <span class="toggler-icon top-bar"></span>
                    <span class="toggler-icon middle-bar"></span>
                    <span class="toggler-icon bottom-bar"></span>
                </button>
                </div>
                <router-link class="navbar-brand ms-auto imgLogo-center" to="/#">
                    <img width="150" src="/img/logo.svg" alt="Magarigawa">
                </router-link>
            </div>
            <div class="TabMenuHeader collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav ms-auto">
                        <li v-for="(item, index) in menu" :key="index" :class="{ 'isActive': item.isActive }"
                            @click="toggleActive(item)">
                            <!-- dont have sub menu -->
                            <router-link :to="item.to" class="nav-link text-white" v-if="!item.subMenu">
                                {{ item.label }}
                            </router-link>
                            <!-- has sub menu -->
                            <a v-else  class="nav-link text-white" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                {{ item.label }}
                            </a>
                            <ul v-if="item.subMenu" class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li v-for="(subItem, subIndex) in item.subMenu" :key="subIndex">
                                    <router-link :to="subItem.to" class="dropdown-item text-white ms-5">
                                        {{ subItem.label }}
                                    </router-link>
                                    <hr  v-if="subIndex < item.subMenu.length - 1" class="dropdown-divider ms-5">
                                </li>
                            </ul>
                            <hr v-if="index < menu.length - 1" class="dropdown-divider">
                        </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
export default {
    name: 'Header',
    data() {
        return {
            menu: [
                {   
                    to: '',
                    label: this.$t('grouptabbooking.btnbooking'),
                    subMenu: [
                        { to: '/31', label: this.$t('grouptabbooking.btntripbook') },
                        { to: '/stay-book', label: this.$t('grouptabbooking.btnstaybook') },
                        { to: '/faclility-book', label: this.$t('grouptabbooking.btnfacilitybook') },
                    ],
                    isActive: false
                },
                { to: '/1', label: this.$t('grouptabbooking.btnconfirm'), subMenu: null,isActive: false},
                { to: '/2', label: this.$t('grouptabbooking.btnhistory'), subMenu: null,isActive: false },
                { to: '/3', label: this.$t('grouptabbooking.btncalendar'), subMenu: null,isActive: false },
                { to: '/4', label: this.$t('grouptabbooking.btnnotice'), subMenu: null,isActive: false },
                { to: '/5', label: this.$t('grouptabbooking.btnmypage'), subMenu: null,isActive: false },
                { to: '/6', label: this.$t('grouptabbooking.btnlogout'), subMenu: null,isActive: false },
            ]
        }
    },
    methods: {
        toggleActive(item) {
            this.menu.forEach((menuItem) => {
                menuItem.isActive = false;
            });
            item.isActive = true;
        },
        clearActive(){
            this.menu.forEach((menuItem) => {
                menuItem.isActive = false;
            });
        }
    },
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Header.scss";
</style>