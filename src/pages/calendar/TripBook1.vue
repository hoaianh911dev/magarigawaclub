<template>
    <div class="form-search">
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-12">{{ $t('book.titleBook') }}</label>
            <label class="title-input col-span-5">{{ $t('book.lblDate') }}</label>
            <div class="custome_date col-span-7">
                <el-date-picker
                v-model="formInput.dateBook"
                type="date"
                format="YYYY.M.DD ddd" 
                :disabled-date="disabledDate" />
            </div>
        </div>
    </div>
    <div class="line"></div>
    <div class="text-note">
        <p>{{ $t('book.tripNote1') }}</p>
        <p>※ {{ $t('book.tripNote2') }}</p>
    </div>
    <div class="form-calendar">
        <div class="custom-header">
            {{ formatDate }}
        </div>
        <div class="calendar-time">
            <table>
                <tbody>
                    <tr v-for="item in arrTime" :key="item">
                        <th>{{ item }}</th>
                        <template v-for="data in calculatorTimeSpan(item)" :key="data">
                            <td v-if="calculatorTimeSpan(item).findIndex(x => x.status === 'close') > -1" :rowspan="data.rowSpan"
                                colspan="2">
                                <div class=" status statusCleaning">{{ data.name }}</div>
                            </td> 
                            <template v-else-if="calculatorTimeSpan(item).length === 2">
                                <td :rowspan="data.rowSpan" v-if="data.location === '1' || data.location === '2'">
                                    <div class=" status statusChoose" 
                                    @click="hanldeAddSelect(data)" :class="{'statusSelected' : isStatusSelected(data)}">
                                        <div>{{data.name}}</div>
                                        <div>{{ data.fromtime }} - {{ data.totime }}</div>
                                        {{ data.rowSpan*20 }} {{ $t('book.lblMinute') }}
                                    </div>
                                </td>
                            </template>
                            <template v-else>
                                <td :rowspan="data.location === '1' ? data.rowSpan : 1">
                                    <div :class="{
                                        'status statusChoose': data.location === '1',
                                        'statusSelected' : data.location === '1' && isStatusSelected(data)
                                    }"
                                    @click="data.location === '1' ? hanldeAddSelect(data) : ''">
                                        <div>{{ data.location === '1' ? data.name : '' }}</div>
                                        <div>{{ data.location === '1' ? data.fromtime +' -' : '' }} {{ data.location === "1" ? data.totime : "" }}</div>
                                        {{ data.location === '1' ? data.rowSpan*20 + ' ' + $t('book.lblMinute') : '' }}
                                    </div>
                                </td>
                                <td :rowspan="data.location === '2' ? data.rowSpan : 1">
                                    <div :class="{
                                        'status statusChoose': data.location === '2',
                                        'statusSelected': isStatusSelected(data)}"
                                    @click="data.location === '2' ? hanldeAddSelect(data) : ''">
                                        <div>{{ data.location === '2' ? data.name : '' }}</div>
                                        <div>{{ data.location === '2' ? data.fromtime +' -' : "" }} {{ data.location === '2' ? data.totime : '' }}</div>
                                        {{ data.location === '2' ? data.rowSpan*20 + ' ' + $t('book.lblMinute') : "" }}
                                    </div>
                                </td>
                            </template> 
                        </template>
                        <template v-if="calculatorTimeSpan(item).length === 0">
                            <td></td>
                            <td></td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="group-button submit-form">
        <button
            @click="handleSubmit" :disabled="formInput.booking.length === 0 || !formInput.dateBook">{{$t('groupButton.btnContinue')}}</button>
    </div>
</template>

<script lang="ts">
import { ElDatePicker } from 'element-plus'
import { arrTime } from '../../constants/default'
import { getListScheduleTrip } from '../../hooks/useBookingApi'
import { ResponseCode } from '../../enums/response'
import { TScheduleTrip } from '../../types/schedule-trip'

export default {
    
    components: {
        ElDatePicker,
    },  
    emits: ['submitBookHandler'],
    data: () => {
        return {
            arrTime: arrTime,
            lstData: []
        }
    },
    props: {
        formInput: Object,
        formatDate: String
    },
    async created() {
        this.date = this.formInput.dateBook
        await this.loadScheduleTrip()
    },
    methods: {
        disabledDate(date) {
            let formatDay1 = new Date(date).setHours(0, 0, 0, 0)
            let formatDay2 = new Date().setHours(0, 0, 0, 0)
            if (formatDay1 < formatDay2) return true
            return false
        },
        hanldeAddSelect(item) {
            const existIndex = this.formInput.booking.findIndex(x => x.id === item.id)
            if (existIndex > -1) {
                this.formInput.booking.splice(existIndex, 1)
            } else {
                this.formInput.booking.push(item)
            }
        },
        handleSubmit() {
            this.$emit('submitBookHandler')
        },
        async loadScheduleTrip() {
            const response = await getListScheduleTrip()
            if(response.status === ResponseCode.Ok) {
                this.lstData = response.data
            }
        }  ,
        isStatusSelected(data) {
            return (
                this.formInput.booking.findIndex((x) => x.id === data.id) > -1
            );
        },
        calculatorTimeSpan(time) {
            const lstData = this.lstData.filter(data => data.fromtime === time)
            return lstData.map(function(item:TScheduleTrip) {
                const startTime = new Date(`2023-01-01 ${item.fromtime}`)
                const endTime = new Date(`2023-01-01 ${item.totime}`)
                const timeDifference = endTime - startTime
                const hours = timeDifference/(3600*1000)

                return {
                    ...item,
                    rowSpan: hours / (20/60) 
                }
            })
        },
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>