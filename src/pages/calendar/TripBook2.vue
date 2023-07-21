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
                            <option v-for="item in arrTypeUser" :value="item.key" :key="item">{{ item.value }}</option>
                        </select>
                    </div>
                </div>
                <div class="group-input grid grid-cols-12">
                    <label class="col-span-4 title-input">{{ $t('book.lblCustomer') }}</label>
                    <div class="col-span-8">
                        <select class="col-12" v-model="item.customer">
                            <option></option>
                            <option v-for="item in (item.typeCustomer === ETypeCustomer.Customer ? lstCustomer : (item.typeCustomer === ETypeCustomer.Friend ? lstFriend : null))" 
                            :value="item.userid" :key="item">{{ item.fullname }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="group-button">
            <button 
                :disabled="(formInput.booking.filter(x => x.vehicle && x.customer)).length < formInput.booking.length"
                @click="this.$router.push(PATH.tripConfirm.url)">{{$t('groupButton.btnSave')}}</button>
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
//hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import { useQuery } from 'vue-query'
//service
import { getListVehicleInforByUser } from '../../services/bookService'
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
        const { userId } = storage
        
        const { data: lstVehicle, isLoading: loadingVehicle } = useQuery([EQueryKey.Vertical, userId], () => getListVehicleInforByUser({userId: userId}))
       
        const { data: lstCustomer, isLoading: loadingCustomer } = useQuery([EQueryKey.Customer, userId], () => getListCustomerByManagerId({managerid: userId}))

        const { data: lstFriend, isLoading: loadingFriend } = useQuery([EQueryKey.Friend, userId], () => getListFriendByUserId({userId: userId}))

        const handleChangeType = (item) => {
            item.customer = null
        }

        return {
            storage,
            isLoading: loadingVehicle || loadingCustomer || loadingFriend,
            userId,
            lstVehicle,
            lstCustomer,
            lstFriend,
            handleChangeType,
            PATH,
            ETypeCustomer
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
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>