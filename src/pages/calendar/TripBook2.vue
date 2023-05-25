<template>
    <div>
        <div class="title-date">
            <div>{{ formatDate }}</div>
        </div>
        <div class="form-book">
            <div>
                <button class="btn_showPopupFriend"
                @click="isShowPopupFriend = true">{{ $t('groupButton.btnFriend') }}</button>
            </div>
            <div class="item_book mt-16" v-for="item in formInput.bookes" :key="item">
                <div class="text-center">
                    <div>{{ item.content }}</div>
                    <div>{{ item.fromTime }} - {{ item.toTime }}</div>
                </div>
                <div class="group-input grid grid-cols-12">
                    <label class="col-span-4 title-input">{{ $t('book.lblVehicle') }}</label>
                    <div class="col-span-8">
                        <select class="col-12" v-model="item.vehicle">
                            <option v-for="item in lstVehicle" :value="item" :key="item">{{ item }}</option>
                        </select>
                    </div>
                </div>
                <div class="group-input grid grid-cols-12">
                    <label class="col-span-4 title-input">{{ $t('book.lblCustomer') }}</label>
                    <div class="col-span-8">
                        <select class="col-12" v-model="item.customer"
                        v-on:change="item.customer === '友達(他の会員)' ? (isShowPopupOtherGuest = true) : ''">
                            <option v-for="item in arrTypeUser" :value="item" :key="item">{{ item }}</option>
                        </select>
                    </div>
                </div>
                <div class="add-guest mt-5">
                    <a>
                        <span>+{{$t('groupButton.btnAddMember')}}</span>
                    </a>
                </div>
                <OtherGuestPopup :isShowPopupOtherGuest="isShowPopupOtherGuest"
                :dayChoose="item"
                @closeDialog="() => isShowPopupOtherGuest = false"></OtherGuestPopup>
            </div>
        </div>
        <div class="group-button">
            <button 
                :disabled="(formInput.bookes.filter(x => x.vehicle && x.customer)).length < formInput.bookes.length"
                @click="this.$router.push('/trip-confirm')">{{$t('groupButton.btnSave')}}</button>
        </div>
    </div>
    <FriendPopup :isShowPopupFriend="isShowPopupFriend"
    @closeDialog="() => isShowPopupFriend = false"></FriendPopup>
</template>

<script lang="ts">

import { arrTypeUser } from '../../constants/default'
import OtherGuestPopup from './OtherGuestPopup.vue'
import FriendPopup from './FriendPopup.vue'
export default {
    components: {
        OtherGuestPopup,
        FriendPopup
    },
    props: {
        formatDate: String,
        formInput: Object
    },
    data() {
        return {
            lstVehicle: [ '', 'Xe 1', 'Xe 2'],
            arrTypeUser: arrTypeUser,
            isShowPopupOtherGuest: false,
            isShowPopupFriend: false
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>