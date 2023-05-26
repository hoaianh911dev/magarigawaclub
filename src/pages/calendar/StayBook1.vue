<template>
    <div class="form-search">
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblCheckin') }}</label>
            <div class="col-span-7">
                <el-date-picker
                type="date"
                format="YYYY.M.DD ddd" 
                :disabled-date="disabledDate" 
                />
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblCheckout') }}</label>
            <div class="col-span-7">
                <el-date-picker
                type="date"
                format="YYYY.M.DD ddd" 
                :disabled-date="disabledDate" 
                />
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblNumberPeople') }}</label>
            <div class="col-span-7">
                <select class="col-12">
                    <option v-for="item in arrPeople" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblRoomCount') }}</label>
            <div class="col-span-7">
                <select class="col-12">
                    <option v-for="item in arrPeople" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="show-more">
            <a class="btnMore" @click="isVisibleMore=!isVisibleMore">
                <span v-if="!isVisibleMore">▲ {{$t('groupButton.btnMore')}}</span>
                <span v-if="isVisibleMore">▼ {{$t('groupButton.btnMore')}}</span>
            </a>
        </div>
        <div class="content-more" v-if="isVisibleMore">
            <div class="group-input grid grid-cols-12">
                <label class="col-span-5 title-input">{{$t('book.lblWeek')}}</label>
                <div class="col-span-7 grid grid-cols-12">
                    <label class="group-checkbox col-span-4">MON
                        <input type="checkbox">
                        <span class="custome-checkbox"></span>
                    </label>
                    <label class="group-checkbox col-span-4">TUE
                        <input type="checkbox">
                        <span class="custome-checkbox"></span>
                    </label>
                    <label class="group-checkbox col-span-4">WEB
                        <input type="checkbox">
                        <span class="custome-checkbox"></span>
                    </label>
                    <label class="group-checkbox col-span-4">THU
                        <input type="checkbox">
                        <span class="custome-checkbox"></span>
                    </label>
                    <label class="group-checkbox col-span-8">FRI
                        <input type="checkbox">
                        <span class="custome-checkbox"></span>
                    </label>
                    <label class="group-checkbox col-span-4">SAT
                        <input type="checkbox">
                        <span class="custome-checkbox"></span>
                    </label>
                    <label class="group-checkbox col-span-4">SUN
                        <input type="checkbox">
                        <span class="custome-checkbox"></span>
                    </label>
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <label class="title-input col-span-5">{{ $t('book.lblCategory') }}</label>
                <div class="col-span-7">
                    <select class="col-12">
                        <option v-for="item in arrPeople" :value="item" :key="item">{{ item }}</option>
                    </select>
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <label class="col-span-5 title-input">{{$t('book.selfDriving')}}</label>
                <label class="group-checkbox col-span-7" style="margin-bottom: 0px;">{{$t('book.lblPossible')}}
                    <input type="checkbox">
                    <span class="custome-checkbox"></span>
                </label>
            </div>
        </div>
        <div class="group-button">
            <button>{{$t('groupButton.btnSearch')}}</button>
        </div>
    </div>
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
                <div :data-day="data.day"
                :disabled = "new Date(data.day).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) "
                style="height: 100%">
                    {{ data.day.split('-').slice(2)[0] }}
                    <div v-for="item in listData" :key="item"
                    :class="{ 'booking-trip' : item.day == data.day && item.status == 1,
                            'booking-stay': item.day == data.day && item.status == 2,
                            'booking-facility': item.day == data.day && item.status == 3}"
                            >{{ item.day == data.day && item.status == 1 ? $t('groupButton.btnTrip') : 
                    item.day == data.day && item.status == 2 ? $t('groupButton.btnStay') : 
                    item.day == data.day && item.status == 3 ? $t('groupButton.btnFacility') : ''}}</div>
                </div>
            </template>
        </el-calendar>
        <div class="group-button submit-form">
            <button @click="this.$emit('submitStayBookHandler', {numberStayBook: 2})">{{$t('groupButton.btnContinue')}}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { ElDatePicker, ElCalendar, ElButton, ElButtonGroup } from 'element-plus'
import { ref } from 'vue'
import { arrPeople, dayOfWeeks } from '../../constants/default'
export default {
    components: {
        ElDatePicker,
        ElCalendar,
        ElButton,
        ElButtonGroup
    },  

    setup() {
        const calendar = ref();
        const selectDate = (val) => {
            calendar.value.selectDate(val);
        };
        return {
            calendar,
            selectDate,
        };
        
    },

    props: {
        formInput: Object
    },
    data() {
        return {
            arrPeople: arrPeople,
            isVisibleMore: false,
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
        }
    },
    methods: {
        disabledDate(date) {
            let formatDay1 = new Date(date).setHours(0, 0, 0, 0)
            let formatDay2 = new Date().setHours(0, 0, 0, 0)
            if (formatDay1 < formatDay2) return true
            return false
        },
        formattedDate(val) {
            const [year, month] = val.toString().split("  ");
            const monthIndex = new Date(`${month} 1, 2021`).getMonth() + 1;
            const formattedMonth = `${monthIndex}`;
            return `${year} . ${formattedMonth} ${month} `;
        },
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>