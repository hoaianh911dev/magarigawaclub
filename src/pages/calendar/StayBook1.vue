<template>
    <div class="form-search">
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblNumberPeople') }}</label>
            <div class="col-span-7">
                <select class="col-12" v-model="formInput.numberPeople">
                    <option v-for="item in arrNumber" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblRoomCount') }}</label>
            <div class="col-span-7">
                <select class="col-12" v-model="formInput.numberRoom">
                    <option v-for="item in arrNumber" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
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
                style="height: 100%"
                @click="new Date(data.day).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) ? handleAddDate(data.day) : ''"
                :class="{'choosed_date': handleSelected(data.day)}">
                    {{ data.day.split('-').slice(2)[0] }}
                </div>
            </template>
        </el-calendar>
        <div class="group-button submit-form">
            <button @click="this.$emit('submitStayBookHandler', {numberStayBook: 2})"
            :disabled="!formInput.numberPeople || !formInput.numberRoom || !formInput.checkin || !formInput.checkout">{{$t('groupButton.btnContinue')}}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
//layout
import { ElCalendar, ElButton, ElButtonGroup } from 'element-plus'
//const
import { arrNumber, dayOfWeeks } from '../../constants/default'
//hooks
import useHelper from '../../hooks/useHelper'
export default {
    components: {
        ElCalendar,
        ElButton,
        ElButtonGroup
    },  
    emits: ['submitStayBookHandler'],

    setup() {
        const helper = useHelper()
        const calendar = ref()
        const selectDate = (val) => {
            calendar.value.selectDate(val);
        };
        return {
            calendar,
            selectDate,
            helper
        };
        
    },

    props: {
        formInput: Object
    },
    data() {
        return {
            arrNumber: arrNumber,
            dayOfWeeks: dayOfWeeks
        }
    },
    methods: {
        formattedDate(val) {
            return this.helper.formatYM(val)
        },
        handleAddDate(day) {
            if(this.formInput.checkout) {
                this.formInput.checkin = ''
                this.formInput.checkout = ''
            }
            if(!this.formInput.checkin ) {
                this.formInput.checkin = day
            } else if(this.formInput.checkin <= day){
                this.formInput.checkout = day
            } else {
                this.formInput.checkin = day
            }
        },
        handleSelected(day) {
            let formatDateCheckin = this.formInput.checkin
            let formatDateCheckout = this.formInput.checkout

            if(new Date(formatDateCheckin).setHours(0,0,0) == new Date(day).setHours(0,0,0)) {
                return true
            } else if(new Date(formatDateCheckin).setHours(0,0,0) < new Date(day).setHours(0,0,0) && new Date(formatDateCheckout).setHours(0,0,0) >= new Date(day).setHours(0,0,0)) {
                return true
            }
            return false
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>