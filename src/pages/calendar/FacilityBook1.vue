<template>
    <div class="form-search">
        <div class="group-input grid grid-cols-12">
            <label class="col-span-4 title-input"> {{$t('book.lblDate')}}</label>
            <div class="col-span-8 custome_date">
                <el-date-picker
                type="date"
                format="YYYY.M.D ddd" 
                :disabled-date="disabledDate" 
                />
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="col-span-4 title-input">{{$t('book.lblFacility')}}</label>
            <div class="col-span-8">
                <select>
                    <option v-for="item in lstShisetsu" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="group-button">
            <button class="btnSearch"
            @click="searchHandler()">{{$t('groupButton.btnSearch')}}</button>
        </div>
    </div>
    <div class="line"></div>
    <div class="form-book">
        <p class="mb-20">{{$t('book.facilityNote')}}</p>
        <div v-for="item in arrDateChoose" :key="item" class="text-center mb-10">
            <button class="btnChooseTime"
            @click="formInput.time = item"
            :class="{'active': formInput.time === item}">{{ item }}</button>
        </div>
    </div>
    <div class="group-button submit-form">
        <button
            @click="this.$emit('submitFacilityBookHandler', 2)">{{$t('groupButton.btnContinue')}}</button>
    </div>
</template>

<script lang="ts">
import { ElDatePicker } from 'element-plus';
export default {
    components: {
        ElDatePicker
    },  
    data() {
        return {
            lstShisetsu: ['','プライベートダイニング ','テニスコート'],
            arrDateChoose: null
        }
    },
    props: {
        formInput: Object,
    },
    methods: {
        disabledDate(date) {
            let formatDay1 = new Date(date).setHours(0, 0, 0, 0)
            let formatDay2 = new Date().setHours(0, 0, 0, 0)
            if (formatDay1 < formatDay2) return true
            return false
        },
        searchHandler() {
            this.arrDateChoose = ['14:00 - 15:00', '15:00 - 16:00']
        },
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>