<template>
    <section class="section-main section-booking">
        <TypeTabBooking :routeName="routeName" :isBooking="true"
        :type="type" @updateType="updateType"></TypeTabBooking>
        <div class="tab-group">
            <div class="tab-content hidden_status">
                <div class="tab-panel">
                    <div class="form-calendar">
                        <div class="custome-header-calendar">
                            <table class="el-calendar-table">
                                <thead>
                                    <th v-for="day in dayOfWeeks" :key="day">{{ day }}</th>
                                </thead>
                            </table>
                        </div>
                        <el-calendar ref="calendar">
                            <template #header="{ date }">
                                <div class="custom-header">
                                    <el-button-group>
                                        <el-button size="small" class="custom-header-btn"
                                            @click="selectDate('prev-month')">&lt;</el-button>
                                    </el-button-group>
                                    <span>{{ formattedDate(date) }}</span>
                                    <el-button-group>
                                        <el-button size="small" class="custom-header-btn"
                                            @click="selectDate('next-month')">&gt;</el-button>
                                    </el-button-group>
                                </div>
                            </template>
                            <template #date-cell="{ data }">
                                <div :data-day="data.day" @click="clickCalendarHandler($event, data.day)"
                                :disabled = "new Date(data.day).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) "
                                style="height: 100%">
                                    {{ data.day.split('-').slice(2)[0] }}
                                    <div v-for="item in listData" :key="item"
                                    :class="{ 'booking-trip' : item.day == data.day && item.status == 1,
                                            'booking-stay': item.day == data.day && item.status == 2,
                                            'booking-facility': item.day == data.day && item.status == 3}"
                                            @click="clickCalendarHandler($event, data.day, item.status)">{{ item.day == data.day && item.status == 1 ? $t('groupButton.btnTrip') : 
                                    item.day == data.day && item.status == 2 ? $t('groupButton.btnStay') : 
                                    item.day == data.day && item.status == 3 ? $t('groupButton.btnFacility') : ''}}</div>
                                </div>
                            </template>
                        </el-calendar>
                    </div>
                </div>
            </div>
        </div>
        <BookingDetailPopup :isShowPopup="isShowPopup"
        :statusCurrent="statusCurrent" @closeDialog="isShowPopup = false"></BookingDetailPopup>
        <el-dialog v-model="isShowPopupType">
            <div class="popup popup_type">
                <div class="content-popup">
                    <div class="text-center">
                        <button class="btnType btnTypeTrip" @click="$router.push(PATH.tripBook.url.replace(':date?', dateType))">{{ $t('groupButton.btnTrip') }}</button>
                        <button class="btnType btnTypeStay" @click="$router.push(PATH.stayBook.url)">{{ $t('groupButton.btnStay') }}</button>
                        <button class="btnType btnTypeFacility" @click="$router.push(PATH.facilityBook.url)">{{ $t('groupButton.btnFacility') }}</button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </section>
</template>

<script lang="ts">
import { ref } from 'vue'
//layout
import StatusTabBooking from '../../components/tabs/StatusTabBooking.vue'
import TypeTabBooking from '../../components/tabs/TypeTabBooking.vue'
import BookingDetailPopup from './BookingDetailPopup.vue'
import { ElCalendar, ElButton, ElButtonGroup, ElDialog } from 'element-plus'
//const
import { dayOfWeeks } from '../../constants/default'
import { PATH } from '../../constants/path'



export default {
    components: {
        StatusTabBooking,
        TypeTabBooking,
        ElCalendar,
        ElButton,
        ElButtonGroup,
        ElDialog,
        BookingDetailPopup
    },
    data() {
        return {
            routeName: this.$route.name,
            type: '',
            tabNameActive: '',
            dayOfWeeks: dayOfWeeks,
            listData: [
                {
                    "status" : 1,
                    "day": '2023-05-15'
                },
                {
                    "status" : 2,
                    "day": '2023-05-15'
                },
                {
                    "status": 3,
                    "day": "2023-05-13"
                }
            ],
            isShowPopup: false,
            statusCurrent: 0,
            isShowPopupType: false
        }
    },
    setup() {
        const calendar = ref();
        const selectDate = (val) => {
            calendar.value.selectDate(val);
        };
        return {
            titlePage: 'CALENDAR',
            calendar,
            selectDate,
            PATH
        };
    },
    methods: {
        updateType(type) {
            this.type = type
        },
        updateNameActive(name) {
            this.tabNameActive = name
        },
        formattedDate(val) {
            const [year, month] = val.toString().split("  ");
            const monthIndex = new Date(`${month} 1, 2021`).getMonth() + 1;
            const formattedMonth = `${monthIndex}`;
            return `${year} . ${formattedMonth} ${month} `;
        },
        clickCalendarHandler(event, day, status) {
            if (status === 1 || status === 2 || status === 3 ) {
                event.stopPropagation();
                this.statusCurrent = status
                this.isShowPopup = true
                return
            }
            if (new Date(day).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))
                return
            if(this.type == PATH.tripBook.type) {
                this.$router.push(PATH.tripBook.url.replace(':date?', day))
                return
            } else if(this.type == PATH.stayBook.type) {
                this.$router.push(PATH.stayBook.url)
                return
            } else if(this.type == PATH.facilityBook.type) {
                this.$router.push(PATH.facilityBook.url)
                return
            }
            this.isShowPopupType = true
            this.dateType = day        
        },
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
@import '../../assets/scss/Popup.scss';
</style>