<template>
    <div class="section-main section-member">
        <div class="group-button text-center">
            <router-link :to="{ name: 'HomeTop'}">
                <button class="btnMembershipCard">{{$t('groupButton.btnMembershipCard')}}</button>
            </router-link>
        </div>
        <div class="grid grid-cols-12 gap-10">
            <div class="col-span-4">
                <router-link :to="{ name: 'HomeTop'}">
                    <div class="menu-item text-center">
                        <img src="/img/iconmember_info.png" width="35" height="35"/>
                        <span>{{$t('groupButton.btnMembershipInfo')}}</span>
                    </div>
                </router-link>
            </div>
            <div class="col-span-4">
                <router-link :to="{ name: 'HomeTop'}">
                    <div class="menu-item text-center">
                        <img src="/img/iconmember_info.png" width="35" height="35"/>
                        <span>{{$t('groupButton.btnFriend')}}</span>
                    </div>
                </router-link>
            </div>
            <div class="col-span-4">
                <router-link :to="{ name: 'HomeTop'}">
                    <div class="menu-item text-center">
                        <img src="/img/iconmember_info.png" width="35" height="35"/>
                        <span>{{$t('groupButton.btnGuest')}}</span>
                    </div>
                </router-link>
            </div>
            <div class="col-span-4">
                <router-link :to="{ name: 'HomeTop'}">
                    <div class="menu-item text-center">
                        <img src="/img/iconmember_info.png" width="35" height="35"/>
                        <span>{{$t('groupButton.btnTripHistory')}}</span>
                    </div>
                </router-link>
            </div>
            <div class="col-span-4">
                <router-link :to="{ name: 'HomeTop'}">
                    <div class="menu-item text-center">
                        <img src="/img/iconmember_info.png" width="35" height="35"/>
                        <span>{{$t('groupButton.btnTripBook')}}</span>
                    </div>
                </router-link>
            </div>
            <div class="col-span-4">
                <router-link :to="{ name: 'HomeTop'}">
                    <div class="menu-item text-center">
                        <img src="/img/iconmember_info.png" width="35" height="35"/>
                        <span>{{$t('groupButton.btnVehicleInfo')}}</span>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="lst-link">
            <router-link :to="{ name: 'HomeTop'}">
                <div class="flex justify-between link-item">
                    <span>{{$t('groupButton.btnContact')}}</span>
                    <span>＞</span>
                </div>
            </router-link>
            <router-link :to="{ name: 'HomeTop'}">
                <div class="flex justify-between link-item">
                    <span>{{$t('groupButton.btnPrivacyPolicy')}}</span>
                    <span>＞</span>
                </div>
            </router-link>
            <router-link :to="{ name: 'HomeTop'}">
                <div class="flex justify-between link-item">
                    <span>{{$t('groupButton.btnTermUse')}}</span>
                    <span>＞</span>
                </div>
            </router-link>
        </div>
        <div class="group-button group-btn-translate flex justify-center">
            <button class="btnViTranslate" 
            :class="{'active': this.$i18n.locale === 'vi'}"
            @click="switcherLanguage('vi')">{{$t('groupButton.btnVi')}}</button>
            <button class="btnEnglishTranslate" 
            :class="{'active': this.$i18n.locale === 'en'}"
            @click=" switcherLanguage('en')">{{$t('groupButton.btnEn')}}</button>
        </div>
    </div>
</template>
<script lang="ts">
import { PATH } from '../../constants/path'
export default {
    data() {
        return {
            PATH: PATH
        }
    },
    methods: {
        switcherLanguage(lang) {
            this.$i18n.locale = lang
            localStorage.setItem('language', lang)
        }
    },
}
</script>
<style lang="scss">
@import '../../assets/scss/Member.scss';
</style>