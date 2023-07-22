<template>
    <section class="section-main section-book">
        <TypeTabBooking :routeName="routeName"></TypeTabBooking>
        <div class="tab-group">
            <StatusTabBooking :routeName="routeName"></StatusTabBooking>
            <div class="tab-content">
                <div class="tab-panel">
                    <div class="wrapper lst_booked">
                        <div class="lst_item" v-for="item in lstBooked" @click="diglogVisible=true;bookedItem=item" :key="item">
                            <button>{{$t('book.sttBooked')}}</button>
                            <span>{{item.nameRoom}}</span>
                            <div class="item_calendar">{{item.day}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-model="diglogVisible" v-if="diglogVisible">
            <div class="popup popup_friend">
                <div class="content-popup">
                    <div>{{ bookedItem.nameRoom }}</div>
                    <div>
                        {{ bookedItem.content }}
                    </div>
                    <div>
                        {{$t('book.lblDate')}}: {{ bookedItem.day }}
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
import { ElDialog } from 'element-plus'
//hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import { useQuery } from 'vue-query'
//const
import { EQueryKey } from '../../enums/query-key'
import { ETypeBooking, EStatusBooking } from '../../enums/booking'
//service
import { getListBookingByStatus } from '../../services/bookService'

export default {
    components: {
        TypeTabBooking,
        StatusTabBooking,
        ElDialog,
        Loading
    },
    setup() {
        const storage = useLocalStorage() 
        const { userId } = storage
        const { data: lstBooked, isLoading } = useQuery([EQueryKey.StayBooked, userId], () => getListBookingByStatus({status: EStatusBooking.Booked, userid: userId, typeBook: ETypeBooking.Stay}))

        return {
            lstBooked,
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
    },
}
</script>
<style lang="scss">
@import "../../assets/scss/Booking.scss";
@import "../../assets/scss/Popup.scss";
</style>