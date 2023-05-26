<template>
    <div class="form-search">
        <div class="group-input grid grid-cols-12">
            <label class="col-span-5 title-input">{{$t('book.lblDuration')}}</label>
            <div class="col-span-7 custome_date">
                <el-date-picker
                type="date"
                format="YYYY.M.DD ddd" 
                disabled="true"
                />
            </div>
            <label class="col-span-5 title-input"></label>
            <div class="col-span-7 custome_date text-center" style="margin-top:10px">
                ~
            </div>
            <label class="col-span-5 title-input"></label>
            <div class="col-span-7 custome_date" style="margin-top:10px">
                <el-date-picker
                type="date"
                format="YYYY.M.DD ddd"
                disabled="true"
                />
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblNumberPeople') }}</label>
            <div class="col-span-7">
                <select class="col-12" disabled="true">
                    <option v-for="item in arrPeople" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblRoomCount') }}</label>
            <div class="col-span-7">
                <select class="col-12" disabled>
                    <option v-for="item in arrPeople" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="form-book">
        <div class="group-input grid grid-cols-12 mb-10">
            <div v-for="(dateInfor, index) in loadDateInfor" :key="dateInfor" 
            class="col-span-4 mb-2">
                <button class="btn_inforRoom"
                :class="{'active': index == roomSelected}"
                @click="roomSelected=index">{{$t('book.building')}} {{ index+1 }}</button>
            </div>
        </div>
        <div class="group-input grid grid-cols-12 mb-2">
            <div class="col-span-4 mb-10">
                <button class="btn_showPopupFriend"
                @click="isShowPopupFriend = true">{{$t('groupButton.btnFriend')}}</button>
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="col-span-5 title-input">{{$t('book.lblCustomer')}}</label>
            <div class="col-span-7">
                <select class="mb-10" v-for="(cus,index) in arrCustomer" v-model="guest[index]" 
                v-on:change="guest[index] === '友達(他の会員)' ? (isShowPopupOtherGuest = true) : cus.Name=guest[index]"
                :key="index">
                    <option v-for="item in arrTypeUser" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="add-guest">
            <a @click="arrCustomer.push({})">
                <span>+{{$t('groupButton.btnAddMember')}}</span>
            </a>
        </div>
        <div class="group-button">
            <button :disabled="arrCustomer.findIndex(cus => cus.Name) == -1"
                @click="this.$router.push('/stay-confirm')">{{$t('groupButton.btnSave')}}</button>
        </div>
    </div>
    <FriendPopup :isShowPopupFriend="isShowPopupFriend"
    @closeDialog="() => isShowPopupFriend = false"></FriendPopup>
    <OtherGuestPopup :isShowPopupOtherGuest="isShowPopupOtherGuest"
    :dayChoose="formInput"
    @closeDialog="() => isShowPopupOtherGuest = false"></OtherGuestPopup>
</template>

<script lang="ts">
import { ElDatePicker } from 'element-plus'
import { arrPeople, dayOfWeeks, arrTypeUser } from '../../constants/default'
import FriendPopup from './FriendPopup.vue'
import OtherGuestPopup from './OtherGuestPopup.vue'

export default {
    components: {
        ElDatePicker,
        FriendPopup,
        OtherGuestPopup
    },
    data() {
        return {
            arrPeople: arrPeople,
            roomSelected: 0,
            typeRoom: [
                {
                    id: 1,
                    name: 'タイプA'
                },{
                    id: 2,
                    name: 'タイプB'
                }
            ],
            isShowPopupFriend: false,
            isShowPopupOtherGuest: false,
            arrCustomer: [
                {}
            ],
            guest: {},
            arrTypeUser: arrTypeUser
        }
    },
    props: {
        formInput: Object
    },
    computed: {
        loadDateInfor() {
            this.dataInforRoom = []
            const startDate = new Date(this.formInput.dayStart)
            const endDate = new Date(this.formInput.dayEnd)
            
            let currentDate = new Date(startDate)

            while(currentDate < endDate) {
                for(let i = 0; i < this.formInput.roomCount; i++) {
                    if(!this.dataInforRoom[i]) this.dataInforRoom[i] = []
                    this.dataInforRoom[i].push({
                        Date: new Date(currentDate),
                        TypeRoom: '1'
                    })
                }
                currentDate.setDate(currentDate.getDate() + 1)
            }

            return this.dataInforRoom
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>