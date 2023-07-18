<template>
    <div class="section-main section-member">
        <div class="group-button text-center">
            <router-link :to="{ name: PATH.membershipCard.name}">
                <button class="btnMembershipCard">{{$t('groupButton.btnMembershipCard')}}</button>
            </router-link>
        </div>
        <div class="grid grid-cols-12 gap-10">
            <div class="col-span-4">
                <router-link :to="{ name: PATH.membershipInfo.name}">
                    <div class="menu-item text-center">
                        <font-awesome-icon :icon="['far', 'fa-user']" class="text-26"/>
                        <span>{{$t('groupButton.btnMembershipInfo')}}</span>
                    </div>
                </router-link>
            </div>
            <div class="col-span-4">
                <router-link :to="{ name: PATH.friend.name}">
                    <div class="menu-item text-center">
                        <font-awesome-icon :icon="['fas', 'fa-users']" class="text-26"/>
                        <span>{{$t('groupButton.btnFriend')}}</span>
                    </div>
                </router-link>
            </div>
            <div class="col-span-4">
                <router-link :to="{ name: PATH.guestList.name}">
                    <div class="menu-item text-center">
                        <font-awesome-icon :icon="['far', 'fa-circle-check']" class="text-26"/>
                        <span>{{$t('groupButton.btnGuest')}}</span>
                    </div>
                </router-link>
            </div>
            <div class="col-span-4">
                <router-link :to="{ name: PATH.tripHistory.name}">
                    <div class="menu-item text-center">
                        <font-awesome-icon :icon="['far', 'file-lines']" class="text-26"/>
                        <span>{{$t('groupButton.btnTripHistory')}}</span>
                    </div>
                </router-link>
            </div>
            <div class="col-span-4">
                <router-link :to="{ name: PATH.tripConfirm.name}">
                    <div class="menu-item text-center">
                        <font-awesome-icon :icon="['fas', 'gear']" class="text-26"/>
                        <span>{{$t('groupButton.btnTripConfirm')}}</span>
                    </div>
                </router-link>
            </div>
            <div class="col-span-4">
                <router-link :to="{ name: PATH.vehicleInfo.name}">
                    <div class="menu-item text-center">
                        <font-awesome-icon :icon="['fas', 'car']" class="text-26"/>
                        <span>{{$t('groupButton.btnVehicleInfo')}}</span>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="lst-link">
            <router-link :to="{ name: PATH.contactUs.name }">
                <div class="flex justify-between link-item">
                    <span>{{$t('groupButton.btnContact')}}</span>
                    <span>＞</span>
                </div>
            </router-link>
            <router-link :to="{ name: PATH.privacyPolicy.name }">
                <div class="flex justify-between link-item">
                    <span>{{$t('groupButton.btnPrivacyPolicy')}}</span>
                    <span>＞</span>
                </div>
            </router-link>
            <router-link :to="{ name: PATH.termsOfService.name }">
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
import useLocalStorage from '../../hooks/useLocalStorage'
export default {
    data() {
        return {
            PATH: PATH
        }
    },
    methods: {
        switcherLanguage(lang) {
            this.$i18n.locale = lang
            useLocalStorage().setLanguage(lang)
        }
    },
}
</script>
<style lang="scss">
@import '../../assets/scss/Member.scss';
</style>