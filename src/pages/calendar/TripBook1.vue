<template>
    <div class="form-search">
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-12">{{ $t('book.titleBook') }}</label>
            <label class="title-input col-span-5">{{ $t('book.lblDate') }}</label>
            <div class="custome_date col-span-7">
                <el-date-picker
                v-model="formInput.date"
                type="date"
                format="YYYY.M.DD ddd" 
                :disabled-date="disabledDate" 
                />
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{$t('book.lblNumberPeople')}}</label>
            <input class="col-span-7"/>
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
                <label class="col-span-5 title-input">{{$t('book.lblCategory')}}</label>
                <select class="col-span-7">
                    <option v-for="item in arrType" :value="item" :key="item">{{ item }}</option>
                </select>
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
    <div class="line"></div>
    <div class="text-note">
        <p>{{ $t('book.tripNote1') }}</p>
        <p>※{{ $t('book.tripNote2') }}</p>
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
                            <td v-if="calculatorTimeSpan.findIndex(x => x.countColumn === 3) > -1" :rowspan="data.rowSpan"
                                colspan="2">
                                <div class=" status statusCleaning">{{ data.content }}</div>
                            </td> 
                            <template v-else-if="calculatorTimeSpan.length === 2">
                                <td :rowspan="data.rowSpan" v-if="data.countColumn === 1 || data.countColumn === 2">
                                    <div class=" status statusChoose" 
                                    @click="hanldeAddSelect(data)" :class="{'statusSelected' : data.selected}">
                                        {{data.content}}
                                        <br >
                                        {{ data.fromTime }} - {{ data.toTime }}
                                    </div>
                                </td>
                            </template>
                            <template v-else>
                                <td :rowspan="data.countColumn === 1 ? data.rowSpan : 1">
                                    <div :class="{
                                        'status statusChoose': data.countColumn === 1,
                                        'statusSelected' : data.countColumn === 1 && data.selected
                                    }"
                                    @click="data.countColumn === 1 ? hanldeAddSelect(data) : ''">
                                        <div>{{ data.countColumn === 1 ? data.content : '' }}</div>
                                        {{ data.countColumn === 1 ? data.fromTime +' -' : '' }} {{ data.countColumn === 1 ? data.toTime : "" }}
                                    </div>
                                </td>
                                <td :rowspan="data.countColumn === 2 ? data.rowSpan : 1">
                                    <div :class="{
                                        'status statusChoose': data.countColumn === 2,
                                        'statusSelected': data.selected}"
                                    @click="data.countColumn === 2 ? hanldeAddSelect(data) : ''">
                                        <div>{{ data.countColumn === 2 ? data.content : '' }}</div>
                                        {{ data.countColumn === 2 ? data.fromTime +' -' : "" }} {{ data.countColumn === 2 ? data.toTime : '' }}
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

export default {
    
    components: {
        ElDatePicker,
    },  
    data() {
        return {
            isVisibleMore: false,
            arrType: ['', 'Type1', 'Type2'],
            arrTime: arrTime,
            currentTime: '',
            lstData: [
                {
                    id: 1,
                    fromTime: '08:00',
                    toTime: '08:20',
                    countColumn: 3, 
                    content: 'COURSE CLEANING・座学',
                    selected: false
                },
                {
                    id: 2,
                    fromTime: '09:00',
                    toTime: '09:40',
                    countColumn: 1,
                    content: 'Morning A',
                    selected: false
                }, 
                {
                    id: 3,
                    fromTime: '09:40',
                    toTime: '10:20',
                    countColumn: 2,
                    content: 'Morning B',
                    selected: false
                }, 
                {
                    id: 4,
                    fromTime: '10:20',
                    toTime: '11:00',
                    countColumn: 1,
                    content: 'Morning A',
                    selected: false
                }, 
                {
                    id: 5,
                    fromTime: '11:00',
                    toTime: '11:40',
                    countColumn: 2,
                    content: 'Morning B',
                    selected: false
                }, 
                {
                    id: 6,
                    fromTime: '11:40',
                    toTime: '12:00',
                    countColumn: 1,
                    content: 'Mix 20min',
                    selected: false
                }, 
                {
                    id: 7,
                    fromTime: '12:00',
                    toTime: '12:20',
                    countColumn: 3,
                    content: 'COURSE CLEANING・座学',
                    selected: false
                }, 
                {
                    id: 8,
                    fromTime: '12:20',
                    toTime: '13:00',
                    countColumn: 1,
                    content: 'Beginner',
                    selected: false
                }, 
                {
                    id: 9,
                    fromTime: '12:20',
                    toTime: '13:00',
                    countColumn: 2,
                    content: 'Family',
                    selected: false
                }, 
                {
                    id: 10,
                    fromTime: '13:00',
                    toTime: '13:40',
                    countColumn: 1,
                    content: 'Afternoon A',
                    selected: false
                }, 
            ],
        }
    },
    props: {
        formInput: Object,
        formatDate: String
    },
    computed: {
        calculatorTimeSpan() {
            const lstData = this.lstData.map(function(item) {

                const startTime = new Date(`2023-01-01 ${item.fromTime}`)
                const endTime = new Date(`2023-01-01 ${item.toTime}`)
                const timeDifference = endTime - startTime
                const hours = timeDifference/(3600*1000)

                return {
                    ...item,
                    rowSpan: hours / (20/60) 
                }
            })
            return lstData.filter(data => data.fromTime === this.currentTime)
        },
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
    },

}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>