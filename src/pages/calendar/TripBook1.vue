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
    </div>
</template>

<script lang="ts">

import { ElDatePicker } from 'element-plus'

export default {
    
    components: {
        ElDatePicker,
    },  
    data() {
        return {
            isVisibleMore: false,
            arrType: ['', 'Type1', 'Type2'],
        }
    },
    props: {
        formInput: Object,
        formatDate: String
    },
    methods: {
        disabledDate(date) {
            let formatDay1 = new Date(date).setHours(0, 0, 0, 0)
            let formatDay2 = new Date().setHours(0, 0, 0, 0)
            if (formatDay1 < formatDay2) return true
            return false
        },
    },

}
</script>