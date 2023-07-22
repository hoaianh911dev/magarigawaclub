<template>
    <div class="form-search">
        <div class="group-input grid grid-cols-12">
            <label class="col-span-5 title-input">{{$t('book.lblDuration')}}</label>
            <div class="col-span-7 custome_date">
                <el-date-picker
                type="date"
                format="YYYY.M.DD ddd" 
                :disabled="true"
                v-model="formInput.checkin"
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
                :disabled="true"
                v-model="formInput.checkout"
                />
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblNumberPeople') }}</label>
            <div class="col-span-7">
                <select class="col-12" disabled="true" v-model="formInput.numberPeople">
                    <option v-for="item in arrNumber" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblRoomCount') }}</label>
            <div class="col-span-7">
                <select class="col-12" disabled v-model="formInput.numberRoom">
                    <option v-for="item in arrNumber" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="form-book">
        <div class="group-input group-building grid grid-cols-12 mb-10">
            <div v-for="(dateInfor, index) in formInput.dataInforRoom" :key="dateInfor" 
            class="col-span-4 mb-10">
                <button class="btn_inforRoom"
                :class="{'active': index == roomSelected}"
                @click="roomSelected=index">{{$t('book.building')}} {{ index+1 }}</button>
            </div>
        </div>
        <div class="mb-20">
            <button class="btn_showPopupFriend"
            @click="isShowPopupFriend = true">{{$t('groupButton.btnFriend')}}</button>
            <button class="btn_showPopupFriend ml-10"
            @click="isShowPopupOtherGuest = true">{{ $t('groupButton.btnGuest') }}</button>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="col-span-5 title-input">{{ $t('book.lblTypeCustomer') }}</label>
            <div class="col-span-7">
                <select class="col-12" v-model="formInput.dataInforRoom[roomSelected].typeCustomer"
                v-on:change="handleChangeType(formInput.dataInforRoom[roomSelected])">
                    <option v-for="typeUser in arrTypeUser" :value="typeUser.key" :key="typeUser.key">{{ typeUser.value }}</option>
                </select>
            </div>
        </div>          
        <div class="group-input grid grid-cols-12">
            <label class="col-span-5 title-input">{{$t('book.lblCustomer')}}</label>
            <div class="col-span-7">
            <select class="mb-10" v-model="formInput.dataInforRoom[roomSelected].customer">
                <option></option>
                <option v-for="user in (formInput.dataInforRoom[roomSelected].typeCustomer === ETypeCustomer.Customer ? lstCustomer : (formInput.dataInforRoom[roomSelected].typeCustomer === ETypeCustomer.Friend ? lstFriend : null))" 
                    :value="user.userid" :key="user">{{ user.fullname }}</option>                
            </select>
            </div>
        </div>
        <div class="group-button">
            <button :disabled="formInput.dataInforRoom.findIndex(info => !info.customer) > -1"
                @click="handleSubmit">{{$t('groupButton.btnSave')}}</button>
        </div>
    </div>
    <FriendPopup :isShowPopupFriend="isShowPopupFriend"
    @closeDialog="() => isShowPopupFriend = false"
    :userId="userId"></FriendPopup>
    <OtherGuestPopup :isShowPopupOtherGuest="isShowPopupOtherGuest"
    @closeDialog="() => isShowPopupOtherGuest = false"
    :userId="userId"></OtherGuestPopup>
    <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">
//layout
import { ElDatePicker } from 'element-plus'
import FriendPopup from './FriendPopup.vue'
import OtherGuestPopup from './OtherGuestPopup.vue'
import Loading from '../../components/loading/Loading.vue'
//const
import { arrNumber, arrTypeUser } from '../../constants/default'
import { EQueryKey } from '../../enums/query-key'
import { ETypeCustomer } from '../../enums/type-customer'
import { PATH } from '../../constants/path'
import { EStatusBooking, ETypeBooking } from '../../enums/booking'
//hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import useHelper from '../../hooks/useHelper'
import useNotification from '../../hooks/useNotification'
import { useQuery, useMutation, useQueryClient } from 'vue-query'
//service
import { getListCustomerByManagerId } from '../../services/customerService'
import { getListFriendByUserId } from '../../services/friendService'
import { createBooking } from '../../services/bookService'

export default {

    components: {
        ElDatePicker,
        FriendPopup,
        OtherGuestPopup,
        Loading
    },

    props: {
        formInput: Object
    },

    data() {
        return {
            roomSelected: 0,
            isShowPopupFriend: false,
            isShowPopupOtherGuest: false
        }
    },
    
    setup() {
        const storage = useLocalStorage()
        const helper = useHelper()
        const notify = useNotification()
        const queryClient = useQueryClient()
        const { userId } = storage

        const { data: lstCustomer, isLoading: loadingCustomer } = useQuery([EQueryKey.Customer, userId], () => getListCustomerByManagerId({userid: userId}))
        const { data: lstFriend, isLoading: loadingFriend } = useQuery([EQueryKey.Friend, userId], () => getListFriendByUserId({userId: userId}))
        const { mutate: mutateCreateBooking, isLoading: loadingCreate } = useMutation(createBooking)

        const handleChangeType = (item) => {
            item.customer = null
        }

        return {
            helper,
            notify,
            queryClient,
            userId,
            lstCustomer,
            lstFriend,
            isLoading: loadingCustomer || loadingFriend || loadingCreate,
            handleChangeType,
            ETypeCustomer,
            arrNumber,
            arrTypeUser,
            mutateCreateBooking
        }
    },

    methods: {
        handleSubmit() {
            let lstBookingNew = []
            this.formInput.dataInforRoom?.forEach(room => {
                for(let i = 0; i < room.length; i++) {
                    //get day
                    let bookingNew = {
                        customerid: room.customer,
                        typecustomer: room.typeCustomer,
                        status: EStatusBooking.Booked,
                        userid: this.userId,
                        orderdate: this.helper.formatDateDMYString(room[i].Date),
                        typeroom: room[i].TypeRoom,
                        typebook: ETypeBooking.Stay
                    }
                    lstBookingNew.push(bookingNew)
                }
            });
            this.mutateCreateBooking(lstBookingNew, {
                onSuccess: (newData) => {
                    if(newData) {
                        this.notify.nofifySuccess("S_0004", ["N0003"])
                        this.queryClient.invalidateQueries([EQueryKey.StayBooked, this.userId])
                        this.$router.push(PATH.stayConfirm.url)
                    } else {
                        this.notify.notifyError("E_0005")
                    }
                },
                onError: () => {
                    this.notify.notifyError("E_0005")
                }
            })
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>