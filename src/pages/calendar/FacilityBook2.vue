<template>
    <div class="title-date">
        <div>{{ formatDate }}</div>
    </div>
    <div class="form-book">
        <div class="text-center">
            <div>{{ formInput.category.name }}</div>
            <div>{{ formInput.time }}</div>
        </div>
        <div class="group-input mb-20">
            <button class="btn_showPopupFriend"
            @click="isShowPopupFriend = true">{{$t('groupButton.btnFriend')}}</button>
            <button class="btn_showPopupFriend ml-10"
            @click="isShowPopupOtherGuest = true">{{ $t('groupButton.btnGuest') }}</button>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="col-span-5 title-input">{{ $t('book.lblTypeCustomer') }}</label>
            <div class="col-span-7">
                <select v-model="formInput.typeCustomer"
                v-on:change="handleChangeType(formInput)">
                    <option v-for="typeUser in arrTypeUser" :value="typeUser.key" :key="typeUser.key">{{ typeUser.value }}</option>
                </select>
            </div>
        </div>
        <div class="group-input grid grid-cols-12 mb-40">
            <label class="col-span-5 title-input">{{$t('book.lblCustomer')}}</label>
            <div class="col-span-7">
                <select v-model="formInput.customer">
                    <option></option>
                    <option v-for="user in (formInput.typeCustomer === ETypeCustomer.Customer ? lstCustomer : (formInput.typeCustomer === ETypeCustomer.Friend ? lstFriend : null))" 
                    :value="user.userid" :key="user">{{ user.fullname }}</option>
                </select>
            </div>
        </div>
        <div class="group-button">
            <button :disabled="!formInput.customer"
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
import { ETypeBooking, EStatusBooking } from '../../enums/booking'
import { PATH } from '../../constants/path'
//hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import useHelper from '../../hooks/useHelper'
import useNotification from '../../hooks/useNotification'
import { useQuery, useMutation, useQueryClient } from 'vue-query'
//service
import { createBooking } from '../../services/bookService'
import { getListCustomerByManagerId } from '../../services/customerService'
import { getListFriendByUserId } from '../../services/friendService'

export default {
    components: {
        OtherGuestPopup,
        FriendPopup,
        Loading
    },
    props: {
        formInput: Object
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
            lstCustomer,
            lstFriend,
            handleChangeType,
            ETypeCustomer,
            userId,
            isLoading: loadingCustomer || loadingFriend || loadingCreate,
            mutateCreateBooking
        }
    },
    data() {
        return {
            isShowPopupFriend: false,
            arrCustomer: [{}],
            guest: {},
            isShowPopupOtherGuest: false,
            arrTypeUser: arrTypeUser,
        }
    },
    computed: {
        formatDate() {
            return this.helper.formatDateDMYString(this.formInput.dateBook)
        }
    },
    methods: {
        handleSubmit() {
            let lstBookingNew = []
            let bookingNew = {
                customerid: this.formInput.customer,
                typecustomer: this.formInput.typeCustomer,
                status: EStatusBooking.Booked,
                userid: this.userId,
                orderdate: this.helper.formatDateDMYString(this.formInput.dateBook),
                typebook: ETypeBooking.Facility,
                time: this.formInput.time,
                typefacility: this.formInput.category.id
            }
            lstBookingNew.push(bookingNew)

            this.mutateCreateBooking(lstBookingNew, {
                onSuccess: (newData) => {
                    if(newData) {
                        this.notify.nofifySuccess("S_0004", ["N0003"])
                        this.queryClient.invalidateQueries([EQueryKey.FacilityBooked, this.userId])
                        this.$router.push(PATH.facilityConfirm.url)
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