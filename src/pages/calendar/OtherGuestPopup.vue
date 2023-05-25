<template>
    <el-dialog v-model="diglogVisible" :before-close="handleClose">
        <div class="popup popup_otherGuest">
            <div class="content-popup">
                <p>{{$t('popup.noteOtherGuest')}}</p>
                <div class="group-input group_dateChoose grid grid-cols-12">
                    <label class="col-span-4 title-input">{{$t('popup.datetime')}}</label>
                    <div class="col-span-8">
                        <span v-if="dayChoose.dayStart">{{ formatDateDiff }}</span>
                        <span v-if="dayChoose.date">{{ formatDate }}</span>
                        <span v-if="dayChoose.fromTime && dayChoose.toTime">
                            {{ dayChoose.fromTime }} - {{ dayChoose.toTime }}
                        </span>
                    </div>
                </div>
                <div class="group-input grid grid-cols-12">
                    <label class="col-span-4 title-input">{{$t('book.lblCustomer')}}</label>
                    <div class="col-span-8">
                        <select>
                            <option v-for="item in arrTypeUser" :value="item" :key="item">{{ item }}</option>
                        </select>
                    </div>
                </div>
                <p class="mt-2">{{ $t('popup.noteOtherGuest2') }}</p>
                <div class="group-input grid grid-cols-12">
                    <label class="col-span-4 title-input">{{ $t('popup.fullName') }}</label>
                    <div class="col-span-8">
                        <input />
                    </div>
                </div>
                <div class="group-input grid grid-cols-12">
                    <label class="col-span-4 title-input">{{ $t('popup.birthday') }}</label>
                    <div class="col-span-8 custome_date">
                        <el-date-picker
                        v-model="birthday"
                        type="date"
                        format="YYYY.M.DD ddd"
                        />
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>

import { ElDialog, ElDatePicker } from 'element-plus'
import { dayOfWeeks } from '../../constants/default'

export default {
    components: {
        ElDialog,
        ElDatePicker
    },
    props: {
        isShowPopupOtherGuest: Boolean,
        dayChoose: Object,
    },
    data() {
        return {
            diglogVisible: false,
            arrTypeUser: [
                '','会員本人','ゲスト','友達(他の会員)'
            ],
            birthday: ''
        }
    },
    computed: {
        formatDate() {
            const date = new Date(this.dayChoose.date)
            return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()} ${dayOfWeeks[date.getDay()]}`
        },
        formatDateDiff() {
            const dateStart = new Date(this.dayChoose.dayStart)
            const dateEnd = new Date(this.dayChoose.dayEnd)

            return `${dateStart.getFullYear()}.${dateStart.getMonth()+1}.${dateStart.getDate()} ${dayOfWeeks[dateStart.getDay()]} ~ ${dateEnd.getFullYear()}.${dateEnd.getMonth()+1}.${dateEnd.getDate()} ${dayOfWeeks[dateEnd.getDay()]}`
        }
    },
    watch: {
        isShowPopupOtherGuest(newValue) {
            this.diglogVisible = newValue
        }
    },
    methods: {
        handleClose() {
            this.$emit("closeDialog")
        }
    }
}

</script>

<style lang="scss" scoped>
    @import "../../assets/scss/popup.scss";
</style>