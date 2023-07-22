<template>
    <div class="form-search">
        <div class="group-input grid grid-cols-12">
            <label class="col-span-5 title-input">{{$t('book.lblDuration')}}</label>
            <div class="col-span-7 custome_date">
                <el-date-picker
                type="date"
                format="YYYY.M.DD ddd" 
                :disabled="true"
                v-model="formInput.checkin"
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
                :disabled="true"
                v-model="formInput.checkout"
                />
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblNumberPeople') }}</label>
            <div class="col-span-7">
                <select class="col-12" disabled="true" v-model="formInput.numberPeople">
                    <option v-for="item in arrNumber" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="title-input col-span-5">{{ $t('book.lblRoomCount') }}</label>
            <div class="col-span-7">
                <select class="col-12" disabled v-model="formInput.numberRoom">
                    <option v-for="item in arrNumber" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="form-book">
        <div class="group-input group-building grid grid-cols-12 mb-10">
            <div v-for="(dateInfor, index) in loadDateInfor" :key="dateInfor" 
            class="col-span-4 mb-10">
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
                <div v-for="room in lstTypeRoom" :key="room.id" class="text-center mb-10">
                    <button class="btn_typeRoom" :class="{'active': room.id == dateInfor.TypeRoom}"
                    @click="dateInfor.TypeRoom = room.id">
                    {{ room.name }}</button>
                </div>
            </div>
        </div>
        <div class="group-button">
            <button
            @click="this.$emit('submitStayBookHandler', {numberStayBook: 3})">
            {{$t('groupButton.btnContinue')}}</button>
        </div>
    </div>
    <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">
//layout
import { ElDatePicker } from 'element-plus'
import Loading from '../../components/loading/Loading.vue'
//const
import { ECategory } from '../../enums/category'
import { arrNumber } from '../../constants/default'
import { EQueryKey } from '../../enums/query-key'
//hooks
import { useQuery } from 'vue-query'
import useHelper from '../../hooks/useHelper'
//service
import { getListTypeRoomByType } from '../../services/bookService'

export default {

    components: {
        ElDatePicker,
        Loading
    },

    props: {
        formInput: Object
    },

    emits: ['submitStayBookHandler'],

    setup() {
        const helper = useHelper()

        const { data: lstTypeRoom, isLoading } = useQuery([EQueryKey.Category, ECategory.CategoryRoom], () => getListTypeRoomByType({type: ECategory.CategoryRoom}))

        return {
            helper,
            lstTypeRoom,
            isLoading,
            arrNumber
        }
        
    },

    data() {
        return {
            roomSelected: 0
        }
    },

    computed: {
        loadDateInfor() {
            this.formInput.dataInforRoom = []
            const startDate = new Date(this.helper.formatDateMDY(this.formInput.checkin))
            const endDate = new Date(this.helper.formatDateMDY(this.formInput.checkout))

            let currentDate = new Date(startDate)

            while(currentDate < endDate) {
                for(let i = 0; i < this.formInput.numberRoom; i++) {
                    if(!this.formInput.dataInforRoom[i]) this.formInput.dataInforRoom[i] = []
                    this.formInput.dataInforRoom[i].push({
                        Date: new Date(currentDate),
                        TypeRoom: this.lstTypeRoom ? this.lstTypeRoom[0].id : ''
                    })
                }
                currentDate.setDate(currentDate.getDate() + 1)
            }

            return this.formInput.dataInforRoom
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>