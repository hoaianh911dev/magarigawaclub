<template>
    <div class="form-search">
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-12">{{ $t('book.titleBook') }}</label>
            <label class="title-input col-span-5">{{ $t('book.lblDate') }}</label>
            <div class="custome_date col-span-7">
                <el-date-picker
                v-model="date"
                type="date"
                format="YYYY.M.DD ddd" 
                :disabled-date="disabledDate" />
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{$t('book.lblNumberPeople')}}</label>
            <input class="col-span-7 number" v-model="formInput.quantity" @input="validate"
            maxlength="2"/>
        </div>
        <div class="group-button mt-30">
            <button @click="formInput.dateBook = date">{{  $t('groupButton.btnSearch') }}</button>
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
                        <div hidden>{{ currentTime = item }}</div>
                        <template v-for="data in calculatorTimeSpan" :key="data">
                            <td v-if="calculatorTimeSpan.findIndex(x => x.status === 'close') > -1" :rowspan="data.rowSpan"
                                colspan="2">
                                <div class=" status statusCleaning">{{ data.name }}</div>
                            </td> 
                            <template v-else-if="calculatorTimeSpan.length === 2">
                                <td :rowspan="data.rowSpan" v-if="data.location === '1' || data.location === '2'">
                                    <div class=" status statusChoose" 
                                    @click="hanldeAddSelect(data)" :class="{'statusSelected' : data.selected}">
                                        {{data.name}}
                                        <br >
                                        {{ data.fromtime }} - {{ data.totime }}
                                    </div>
                                </td>
                            </template>
                            <template v-else>
                                <td :rowspan="data.location === '1' ? data.rowSpan : 1">
                                    <div :class="{
                                        'status statusChoose': data.location === '1',
                                        'statusSelected' : data.location === '1' && data.selected
                                    }"
                                    @click="data.location === '1' ? hanldeAddSelect(data) : ''">
                                        <div>{{ data.location === '1' ? data.name : '' }}</div>
                                        {{ data.location === '1' ? data.fromtime +' -' : '' }} {{ data.location === "1" ? data.totime : "" }}
                                    </div>
                                </td>
                                <td :rowspan="data.location === '2' ? data.rowSpan : 1">
                                    <div :class="{
                                        'status statusChoose': data.location === '2',
                                        'statusSelected': data.selected}"
                                    @click="data.location === '2' ? hanldeAddSelect(data) : ''">
                                        <div>{{ data.location === '2' ? data.name : '' }}</div>
                                        {{ data.location === '2' ? data.fromtime +' -' : "" }} {{ data.location === '2' ? data.totime : '' }}
                                    </div>
                                </td>
                            </template> 
                        </template>
                        <template v-if="calculatorTimeSpan.length === 0">
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
            @click="handleSubmit" :disabled="formInput.bookes.length === 0">{{$t('groupButton.btnContinue')}}</button>
    </div>
</template>

<script lang="ts">
import { ElDatePicker } from 'element-plus'
import { arrTime } from '../../constants/default'
import { useFormEnter } from '../../hooks/useFormEnter'
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
            currentTime: '',
            lstData: [],
            date: null
        }
    },
    props: {
        formInput: Object,
        formatDate: String
    },
    computed: {
        calculatorTimeSpan() {
            const lstData = this.lstData.map(function(item:TScheduleTrip) {
                const startTime = new Date(`2023-01-01 ${item.fromtime}`)
                const endTime = new Date(`2023-01-01 ${item.totime}`)
                const timeDifference = endTime - startTime
                const hours = timeDifference/(3600*1000)
                console.log(hours)

                return {
                    ...item,
                    rowSpan: hours / (20/60) 
                }
            })
            return lstData.filter(data => data.fromtime === this.currentTime)
        },
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
            const index = this.lstData.findIndex(x => x.id === item.id)
            this.lstData[index].selected = !this.lstData[index].selected
            if(this.lstData[index].selected === true) {
                this.formInput.bookes.push(this.lstData[index])
            } else {
                const indexBook = this.formInput.bookes.findIndex(x => x.id === item.id)
                this.formInput.bookes.splice(indexBook, 1)
            }
        },
        handleSubmit() {
            this.$emit('submitBookHandler')
        },
        validate(event) {
            useFormEnter(event)
        },
        async loadScheduleTrip() {
            const response = await getListScheduleTrip()
            if(response.status === ResponseCode.Ok) {
                this.lstData = response.data
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>