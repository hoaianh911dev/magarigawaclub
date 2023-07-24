<template>
    <section class="section-main section-book">
        <TypeTabBooking :routeName="routeName"></TypeTabBooking>
        <div class="tab-group">
            <StatusTabBooking :routeName="routeName"></StatusTabBooking>
            <div class="tab-content">
                <div class="tab-panel">
                    <div class="wrapper lst_booked">
                        <div class="lst_item" v-for="item in getListCompleted" @click="diglogVisible=true;bookedItem=item" :key="item">
                            <button class="status_finish isStay">{{$t('book.sttCompleted')}}</button>
                            <span>{{item.nameRoom}}</span>
                            <div class="item_calendar">{{item.day}}
                                <span v-if="item.totime">- {{ item.totime }}</span>
                            </div>
                        </div>
                        <NoRecords v-if="getListCompleted.length == 0"></NoRecords>
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
                        <span v-if="bookedItem.totime">- {{ bookedItem.totime }}</span>
                    </div>
                    <div>
                        {{$t('popup.customer')}}: {{ bookedItem.fullname }}
                    </div>
                    <br>
                    <div>
                        {{$t('popup.fee')}}: {{ bookedItem.price }}
                    </div>
                    <div class="total_price">
                        {{$t('popup.totalAmount')}}: 
                        <span v-if="bookedItem.sum">{{ bookedItem.sum }}</span>
                        <span v-else>{{ bookedItem.price }}</span>
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
import NoRecords from '../../components/no_records/NoRecords.vue'
import TypeTabBooking from '../../components/tabs/TypeTabBooking.vue'
import StatusTabBooking from '../../components/tabs/StatusTabBooking.vue'
import { ElDialog } from 'element-plus'
//hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import useHelper from '../../hooks/useHelper'
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
        Loading,
        NoRecords
    },
    setup() {
        const storage = useLocalStorage() 
        const helper = useHelper()
        const { userId } = storage
        const { data: lstCompleted, isLoading } = useQuery([EQueryKey.StayCompleted, userId], () => getListBookingByStatus({status: EStatusBooking.Completed, userid: userId, typeBook: ETypeBooking.Stay}))

        return {
            helper,
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
    },
    computed: {
        getListCompleted() {
            let newLstCompleted = []
            this.lstCompleted?.forEach(element => {
                let newElement = {...element}

                let indexDay = this.helper.lastFindIndex(newLstCompleted, x => x.nameRoom == element.nameRoom)
                
                if(indexDay === -1)  newLstCompleted.push(newElement)
                else {
                    let fromtime = new Date(this.helper.formatDateMDY(newLstCompleted[indexDay].day))
                    let totime = new Date(this.helper.formatDateMDY(element.day))
                    
                    if(fromtime.getDate() + 1 === totime.getDate()) {
                        newLstCompleted[indexDay].totime = element.day
                        newLstCompleted[indexDay].sum = parseFloat(newLstCompleted[indexDay].price) + parseFloat(element.price)
                    } else {
                        newLstCompleted.push(newElement)
                    }
                }
            });

            return newLstCompleted
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/Booking.scss";
@import "../../assets/scss/Popup.scss";
</style>