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
                            <option v-for="item in lstUser" :value="item.userid" :key="item">{{ item.fullname }}</option>
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
import { useQuery, useQueryClient } from 'vue-query'
//service
import { getListVehicleInforByUser } from '../../services/bookService'
import { getListCustomerByManagerId } from '../../services/customerService'
import { getListFriendByUserId } from '../../services/friendService'
import { onBeforeMount } from 'vue'

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
        const queryClient = useQueryClient()
        const { userId } = storage
        
        const { data: lstVehicle, isLoading: loadingVehicle } = useQuery([EQueryKey.vertical, userId], () => getListVehicleInforByUser({userId: userId}))
       
        const { data: lstCustomer, isLoading: loadingCustomer, isFetching } = useQuery([EQueryKey.customer, userId], {
            enabled: false, //set enable to false initially to prevent automatic fetching
        })
        console.log('isFetching',isFetching)

        const handleChangeType = (item) => {
            // queryClient.resetQueries([EQueryKey.customer, userId])
            item.customer = null
            if(item.typeCustomer === ETypeCustomer.Friend) {
                queryClient.prefetchQuery([EQueryKey.customer, userId], () => getListFriendByUserId({userId: userId}))
            } else if(item.typeCustomer === ETypeCustomer.Customer) {
                queryClient.prefetchQuery([EQueryKey.customer, userId], () => getListCustomerByManagerId({managerid: userId}))
            } 
        }
        onBeforeMount(() => {
            // queryClient.resetQueries([EQueryKey.customer, userId])
        })

        return {
            storage,
            isLoading: loadingVehicle || loadingCustomer,
            userId,
            lstVehicle,
            lstUser: !isFetching ? {} : lstCustomer,
            handleChangeType,
            PATH
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