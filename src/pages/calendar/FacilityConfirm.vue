<template>
    <section class="section-main section-book">
        <TypeTabBooking :routeName="routeName"></TypeTabBooking>
        <div class="tab-group">
            <StatusTabBooking :routeName="routeName"></StatusTabBooking>
            <div class="tab-content">
                <div class="tab-panel">
                    <div class="wrapper lst_booked">
                        <div class="lst_item" v-for="item in lst_booked" @click="diglogVisible=true;bookedItem=item" :key="item">
                            <button>{{$t('book.sttBooked')}}</button>
                            <span>{{item.content}}</span>
                            <div class="item_calendar">{{item.day}} {{ item.time }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-model="diglogVisible">
            <div class="popup popup_friend">
                <div class="content-popup">
                    <div>
                        {{ bookedItem.content }}
                    </div>
                    <div>
                        {{$t('book.lblDate')}}: {{ bookedItem.day }}
                    </div>
                    <div>
                        {{$t('popup.customer')}}: {{ bookedItem.customer }}
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
</template>

<script lang="ts">

import TypeTabBooking from '../../components/tabs/TypeTabBooking.vue'
import StatusTabBooking from '../../components/tabs/StatusTabBooking.vue'
import { ElDialog } from 'element-plus'

export default {
    components: {
        TypeTabBooking,
        StatusTabBooking,
        ElDialog
    },
    data() {
        return {
            routeName: this.$route.name,
            diglogVisible: false,
            bookedItem: null,
            lst_booked: [
                {
                    day: '2023.4.15 sat',
                    content: 'テニスコート',
                    customer: 'Ánh',
                    time: '14:00 - 15:00',
                    price: 12
                },
                {
                    day: '2023.4.15 sat',
                    content: 'テニスコート',
                    customer: 'Thương',
                    time: '14:00 - 15:00',
                    price: 12
                },
                {
                    day: '2023.4.15 sat',
                    content: 'テニスコート',
                    customer: 'Ánh',
                    time: '14:00 - 15:00',
                    price: 12
                },
                {
                    day: '2023.4.15 sat',
                    content: 'テニスコート',
                    customer: 'Ánh',
                    time: '14:00 - 15:00',
                    price: 12
                },
            ],
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
@import '../../assets/scss/Popup.scss';
</style>