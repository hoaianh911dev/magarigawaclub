<template>
    <section class="section-main section-book">
        <TypeTabBooking :routeName="routeName"></TypeTabBooking>
        <div class="tab-group">
            <StatusTabBooking :routeName="routeName"></StatusTabBooking>
            <div class="tab-content">
                <div class="tab-panel">
                    <div class="wrapper lst_booked">
                        <div class="lst_item" v-for="item in getListBooked" @click="diglogVisible=true;bookedItem=item" :key="item">
                            <button>{{$t('book.sttBooked')}}</button>
                            <span>{{item.nameRoom}}</span>
                            <div class="item_calendar">{{item.day}}
                                <span v-if="item.totime">- {{ item.totime }}</span>
                            </div>
                        </div>
                        <NoRecords v-if="getListBooked?.length == 0 && !isLoading"></NoRecords>
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
        const { data: lstBooked, isLoading } = useQuery([EQueryKey.StayBooked, userId], () => getListBookingByStatus({status: EStatusBooking.Booked, userid: userId, typeBook: ETypeBooking.Stay}))

        return {
            helper,
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
    computed: {
        getListBooked() {
            let newLstBooked = []
            this.lstBooked?.forEach(element => {
                let newElement = {...element}

                let indexDay = this.helper.lastFindIndex(newLstBooked, x => x.nameRoom == element.nameRoom)
                
                if(indexDay === -1)  newLstBooked.push(newElement)
                else {
                    let fromtime = new Date(this.helper.formatDateMDY(newLstBooked[indexDay].day))
                    let totime = new Date(this.helper.formatDateMDY(element.day))
                    
                    if(fromtime.getDate() + 1 === totime.getDate()) {
                        newLstBooked[indexDay].totime = element.day
                        newLstBooked[indexDay].sum = parseFloat(newLstBooked[indexDay].price) + parseFloat(element.price)
                    } else {
                        newLstBooked.push(newElement)
                    }
                    
                }
            });

            return newLstBooked
        }
    }
}
</script>
<style lang="scss">
@import "../../assets/scss/Booking.scss";
@import "../../assets/scss/Popup.scss";
</style>