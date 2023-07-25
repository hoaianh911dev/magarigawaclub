<template>
    <section class="section-main section-book">
        <TypeTabBooking :routeName="routeName"></TypeTabBooking>
        <div class="tab-group">
            <StatusTabBooking :routeName="routeName"></StatusTabBooking>
            <div class="tab-content">
                <div class="tab-panel">
                    <div class="wrapper lst_booked">
                        <div class="lst_item" v-for="item in lstCompleted" @click="diglogVisible=true;bookedItem=item" :key="item">
                            <button class="status_finish isStay">{{$t('book.sttBooked')}}</button>
                            <span>{{item.nameFacility}}</span>
                            <div class="item_calendar">{{item.day}} {{item.timeFacility}}</div>
                        </div>
                        <NoRecords v-if="lstCompleted?.length == 0 && !isLoading"></NoRecords>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-model="diglogVisible">
            <div class="popup popup_friend">
                <div class="content-popup">
                    <div>
                        {{ bookedItem.nameFacility }}
                    </div>
                    <div>
                        {{$t('book.lblDate')}}: {{ bookedItem.day }} {{bookedItem.timeFacility}}
                    </div>
                    <div>
                        {{$t('popup.customer')}}: {{ bookedItem.fullname }}
                    </div>
                    <br>
                    <div>
                        {{$t('popup.fee')}}: {{ bookedItem.price }}
                    </div>
                    <div class="total_price">
                        {{$t('popup.totalAmount')}}: {{ bookedItem.price }}
                    </div>
                </div>
            </div>
        </el-dialog>
    </section>
    <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">
//layout
import Loading from '../../components/loading/Loading.vue'
import TypeTabBooking from '../../components/tabs/TypeTabBooking.vue'
import StatusTabBooking from '../../components/tabs/StatusTabBooking.vue'
import NoRecords from '../../components/no_records/NoRecords.vue'
import { ElDialog } from 'element-plus'
//hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import { useQuery } from 'vue-query'
import { ETypeBooking, EStatusBooking } from '../../enums/booking'
//const
import { EQueryKey } from '../../enums/query-key'
//service
import { getListBookingByStatus } from '../../services/bookService'

export default {
    components: {
        TypeTabBooking,
        StatusTabBooking,
        ElDialog,
        Loading,
        NoRecords
    },
    setup() {
        const storage = useLocalStorage()  
        const { userId } = storage
        const { data: lstCompleted, isLoading } = useQuery([EQueryKey.FacilityCompleted, userId], () => getListBookingByStatus({status: EStatusBooking.Completed, userid: userId, typeBook: ETypeBooking.Facility}))
    
        return {
            lstCompleted,
            isLoading
        }
    },
    data() {
        return {
            routeName: '',
            diglogVisible: false,
            bookedItem: null
        }
    },
    created() {
        this.routeName = this.$route.name
    }
}
</script>
<style lang="scss">
@import "../../assets/scss/Booking.scss";
@import "../../assets/scss/Popup.scss";
</style>