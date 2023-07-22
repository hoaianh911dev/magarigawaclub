<template>
    <div>
        <div class="title-date">
            <div>{{ formatDate }}</div>
        </div>
        <div class="form-book">
            <div>
                <button class="btn_showPopupFriend"
                @click="isShowPopupFriend = true">{{ $t('groupButton.btnFriend') }}</button>
                <button class="btn_showPopupFriend ml-10"
                @click="isShowPopupOtherGuest = true">{{ $t('groupButton.btnGuest') }}</button>
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
                    <label class="col-span-4 title-input">{{ $t('book.lblTypeCustomer') }}</label>
                    <div class="col-span-8">
                        <select class="col-12" v-model="item.typeCustomer"
                        v-on:change="handleChangeType(item)">
                            <option v-for="typeUser in arrTypeUser" :value="typeUser.key" :key="typeUser.key">{{ typeUser.value }}</option>
                        </select>
                    </div>
                </div>
                <div class="group-input grid grid-cols-12">
                    <label class="col-span-4 title-input">{{ $t('book.lblCustomer') }}</label>
                    <div class="col-span-8">
                        <select class="col-12" v-model="item.customer">
                            <option></option>
                            <option v-for="user in (item.typeCustomer === ETypeCustomer.Customer ? lstCustomer : (item.typeCustomer === ETypeCustomer.Friend ? lstFriend : null))" 
                            :value="user.userid" :key="user">{{ user.fullname }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="group-button">
            <button 
                :disabled="(formInput.booking.filter(x => x.vehicle && x.customer)).length < formInput.booking.length"
                @click="handleSubmit">{{$t('groupButton.btnSave')}}</button>
        </div>
    </div>
    <FriendPopup :isShowPopupFriend="isShowPopupFriend"
    :userId="userId"
    @closeDialog="() => isShowPopupFriend = false"></FriendPopup>
    <OtherGuestPopup :isShowPopupOtherGuest="isShowPopupOtherGuest"
    :userId="userId"
    @closeDialog="() => isShowPopupOtherGuest = false"></OtherGuestPopup>
    <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">

//layout
import Loading from '../../components/loading/Loading.vue'
import OtherGuestPopup from './OtherGuestPopup.vue'
import FriendPopup from './FriendPopup.vue'
//const
import { arrTypeUser } from '../../constants/default'
import { ETypeCustomer } from '../../enums/type-customer'
import { EQueryKey } from '../../enums/query-key'
import { PATH } from '../../constants/path'
import { ETypeBooking, EStatusBooking } from '../../enums/booking'
//hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import useHelper from '../../hooks/useHelper'
import useNotification from '../../hooks/useNotification'
import { useQuery, useMutation, useQueryClient } from 'vue-query'
//service
import { getListVehicleInforByUser, createBooking } from '../../services/bookService'
import { getListCustomerByManagerId } from '../../services/customerService'
import { getListFriendByUserId } from '../../services/friendService'

export default {
    components: {
        OtherGuestPopup,
        FriendPopup,
        Loading
    },
    props: {
        formatDate: String,
        formInput: Object
    },
    setup() {
        const storage = useLocalStorage()  
        const helper = useHelper()
        const notify = useNotification()
        const queryClient = useQueryClient()
        const { userId } = storage
        
        const { data: lstVehicle, isLoading: loadingVehicle } = useQuery([EQueryKey.Vertical, userId], () => getListVehicleInforByUser({userId: userId}))
       
        const { data: lstCustomer, isLoading: loadingCustomer } = useQuery([EQueryKey.Customer, userId], () => getListCustomerByManagerId({userid: userId}))

        const { data: lstFriend, isLoading: loadingFriend } = useQuery([EQueryKey.Friend, userId], () => getListFriendByUserId({userId: userId}))

        const { mutate: mutateCreateBooking, isLoading: loadingCreate } = useMutation(createBooking)

        const handleChangeType = (item) => {
            item.customer = null
        }

        return {
            storage,
            isLoading: loadingVehicle || loadingCustomer || loadingFriend || loadingCreate,
            userId,
            lstVehicle,
            lstCustomer,
            lstFriend,
            handleChangeType,
            ETypeCustomer,
            mutateCreateBooking,
            helper,
            notify,
            queryClient
        }
    },
    data() {
        return {
            arrTypeUser: arrTypeUser,
            isShowPopupOtherGuest: false,
            isShowPopupFriend: false,
        }
    },
    methods: {
        handleSubmit() {
            let lstBookingNew = []
            this.formInput.booking?.forEach(booking => {
                let bookingNew = {
                    customerid: booking.customer,
                    vehicleid: booking.vehicle,
                    typecustomer: booking.typeCustomer,
                    scheduletripid: booking.id,
                    status: EStatusBooking.Booked,
                    userid: this.userId,
                    orderdate: this.helper.formatDateDMYString(this.formInput.dateBook),
                    typebook: ETypeBooking.Trip
                }
                lstBookingNew.push(bookingNew)
            });
            this.mutateCreateBooking(lstBookingNew, {
                onSuccess: (newData) => {
                    if(newData) {
                        this.notify.nofifySuccess("S_0004", ["N0003"])
                        this.queryClient.invalidateQueries([EQueryKey.TripBooked, this.userId])
                        this.$router.push(PATH.tripConfirm.url)
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
</style>../../enums/booking