<template>
    <div class="form-search">
        <div class="group-input grid grid-cols-12">
            <label class="col-span-4 title-input"> {{$t('book.lblDate')}}</label>
            <div class="col-span-8 custome_date">
                <el-date-picker
                type="date"
                format="DD/MM/YYYY" 
                :disabled-date="disabledDate" 
                v-model="formInput.dateBook"
                />
            </div>
        </div>
        <div class="group-input grid grid-cols-12 mb-10">
            <label class="col-span-4 title-input">{{$t('book.lblFacility')}}</label>
            <div class="col-span-8">
                <select v-model="formInput.category">
                    <option v-for="item in lstCategoryFacility" :value="item" :key="item.id">{{ item.name }}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="line"></div>
    <div class="form-book">
        <p class="mb-20">{{$t('book.facilityNote')}}</p>
        <div v-for="item in arrTimeFacility" :key="item" class="text-center mb-10">
            <button class="btnChooseTime"
            @click="formInput.time = item"
            :class="{'active': formInput.time === item}">{{ item }}</button>
        </div>
    </div>
    <div class="group-button submit-form">
        <button
            @click="this.$emit('submitFacilityBookHandler', 2)"
            :disabled="!formInput.time || !formInput.category || !formInput.dateBook">{{$t('groupButton.btnContinue')}}</button>
    </div>
    <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">
//layout
import { ElDatePicker } from 'element-plus'
import Loading from '../../components/loading/Loading.vue'
//hooks
import { useQuery } from 'vue-query'
//const
import { ECategory } from '../../enums/category'
import { EQueryKey } from '../../enums/query-key'
import { arrTimeFacility } from '../../constants/default'
//service
import { getListTypeRoomByType } from '../../services/bookService'
export default {
    components: {
        ElDatePicker,
        Loading
    },  
    emits: ['submitFacilityBookHandler'],
    props: {
        formInput: Object,
    },
    setup() {

        const { data: lstCategoryFacility, isLoading } = useQuery([EQueryKey.Category, ECategory.CategoryFacility], () => getListTypeRoomByType({type: ECategory.CategoryFacility}))

        return {
            lstCategoryFacility,
            isLoading,
            arrTimeFacility
        }
    },
    methods: {
        disabledDate(date) {
            let formatDay1 = new Date(date).setHours(0, 0, 0, 0)
            let formatDay2 = new Date().setHours(0, 0, 0, 0)
            if (formatDay1 < formatDay2) return true
            return false
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>