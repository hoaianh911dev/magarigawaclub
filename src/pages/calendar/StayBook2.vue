<template>
    <div class="form-search">
        <div class="group-input grid grid-cols-12">
            <label class="col-span-5 title-input">{{$t('book.lblDuration')}}</label>
            <div class="col-span-7 custome_date">
                <el-date-picker
                type="date"
                format="YYYY.M.DD ddd" 
                disabled="true"
                />
            </div>
            <label class="col-span-5 title-input"></label>
            <div class="col-span-7 custome_date text-center" style="margin-top:10px">
                ~
            </div>
            <label class="col-span-5 title-input"></label>
            <div class="col-span-7 custome_date" style="margin-top:10px">
                <el-date-picker
                type="date"
                format="YYYY.M.DD ddd"
                disabled="true"
                />
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblNumberPeople') }}</label>
            <div class="col-span-7">
                <select class="col-12" disabled="true">
                    <option v-for="item in arrPeople" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblRoomCount') }}</label>
            <div class="col-span-7">
                <select class="col-12" disabled>
                    <option v-for="item in arrPeople" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="form-book">
        <div class="group-input grid grid-cols-12 mb-10">
            <div v-for="(dateInfor, index) in loadDateInfor" :key="dateInfor" 
            class="col-span-4 mb-2">
                <button class="btn_inforRoom"
                :class="{'active': index == roomSelected}"
                @click="roomSelected=index">{{$t('book.building')}} {{ index+1 }}</button>
            </div>
        </div>
        <div class="book-date">
            <div class="group-date" v-for="dateInfor in loadDateInfor[roomSelected]" :key="dateInfor">
                <h5 class="title-date">
                    {{$t('book.accommodation')}} {{ dateInfor.Date.getDate()}}/{{dateInfor.Date.getMonth() + 1}}
                </h5>
                <div v-for="room in typeRoom" :key="room.id" class="text-center mb-10">
                    <button class="btn_typeRoom" :class="{'active': room.id == dateInfor.TypeRoom}"
                    @click="dateInfor.TypeRoom = room.id">
                    {{ room.name }}</button>
                </div>
            </div>
        </div>
        <div class="group-button">
            <button
            @click="this.$emit('submitStayBookHandler', {numberStayBook: 3})">{{$t('groupButton.btnContinue')}}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { ElDatePicker } from 'element-plus'
import { arrNumber, dayOfWeeks } from '../../constants/default'

export default {
    components: {
        ElDatePicker
    },
    data() {
        return {
            arrPeople: arrNumber,
            roomSelected: 0,
            typeRoom: [
                {
                    id: 1,
                    name: 'タイプA'
                },{
                    id: 2,
                    name: 'タイプB'
                }
            ],
        }
    },
    props: {
        formInput: Object
    },
    computed: {
        loadDateInfor() {
            this.dataInforRoom = []
            const startDate = new Date(this.formInput.dayStart)
            const endDate = new Date(this.formInput.dayEnd)
            
            let currentDate = new Date(startDate)

            while(currentDate < endDate) {
                for(let i = 0; i < this.formInput.roomCount; i++) {
                    if(!this.dataInforRoom[i]) this.dataInforRoom[i] = []
                    this.dataInforRoom[i].push({
                        Date: new Date(currentDate),
                        TypeRoom: '1'
                    })
                }
                currentDate.setDate(currentDate.getDate() + 1)
            }

            return this.dataInforRoom
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>