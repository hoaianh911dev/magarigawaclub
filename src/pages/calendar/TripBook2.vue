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
            <div class="item_book mt-16" v-for="item in formInput.booking" :key="item">
                <div class="text-center">
                    <div>{{ item.name }}</div>
                    <div>{{ item.fromtime }} - {{ item.totime }}</div>
                    <div>{{ item.rowSpan*20 }} {{ $t('book.lblMinute') }}</div>
                </div>
                <div class="group-input grid grid-cols-12">
                    <label class="col-span-4 title-input">{{ $t('book.lblVehicle') }}</label>
                    <div class="col-span-8">
                        <select class="col-12" v-model="item.vehicle">
                            <option></option>
                            <option v-for="item in lstVehicle" :value="item.id" :key="item">{{ item.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="group-input grid grid-cols-12">
                    <label class="col-span-4 title-input">{{ $t('book.lblCustomer') }}</label>
                    <div class="col-span-8">
                        <select class="col-12" v-model="item.customer"
                        v-on:change="item.customer === '3' ? (isShowPopupOtherGuest = true) : ''">
                            <option v-for="item in arrTypeUser" :value="item.key" :key="item">{{ item.value }}</option>
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
                :disabled="(formInput.booking.filter(x => x.vehicle && x.customer)).length < formInput.booking.length"
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
import useAuth from '../../hooks/useAuth'
import { getListVehicleInforByUser } from '../../hooks/useBookingApi'
import { ResponseCode } from '../../enums/response'

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
            lstVehicle: [],
            arrTypeUser: arrTypeUser,
            isShowPopupOtherGuest: false,
            isShowPopupFriend: false,
        }
    },
    async created() {
        const { userId } = useAuth()

        await this.loadVehicle(userId)
        console.log('userId',userId)
    },
    methods: {
        async loadVehicle(userId) {
            const response = await getListVehicleInforByUser(userId)
            if(response.status === ResponseCode.Ok) {
                this.lstVehicle = response.data
            }
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>