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
                            <div class="item_calendar">{{item.day}} {{ item.fromTime }} - {{ item.toTime }}</div>
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
                    <div class="grid grid-cols-12">
                        <div class="col-span-6">
                            {{$t('book.lblDate')}}: {{ bookedItem.day }}
                        </div>
                        <div class="col-span-6">
                            {{ $t('book.lblTime') }}: {{ bookedItem.fromTime }} - {{ bookedItem.toTime }}
                        </div>
                    </div>
                    <div>
                        {{$t('popup.customer')}}1: {{ bookedItem.rider }}
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
            lst_booked: [
                {
                    day: '2023.4.15 sat',
                    fromTime: '9:00',
                    toTime: '9:40',
                    content: 'Morning A',
                    rider: "Anh",
                    price: "12.000"
                },
                {
                    day: '2023.4.15 sat',
                    fromTime: '9:00',
                    toTime: '9:40',
                    content: 'Morning B',
                    rider: "Thuong",
                    price: "12.000"
                }
            ],
            diglogVisible: false,
            bookedItem: null
        }
    },
}

</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
@import '../../assets/scss/Popup.scss';
</style>