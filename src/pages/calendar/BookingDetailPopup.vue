<template>
    <el-dialog v-model="diglogVisible" :before-close="handleClose">
        <div class="popup popup_friend">
            <div class="content-popup">
                <div>{{ $t('popup.serviceType') }}: {{ dialogItem.typeBook }}</div>
                <div v-if="statusCurrent === 1 || statusCurrent === 3">
                    <div>
                    {{ $t('popup.datetime') }}: {{ dialogItem.date }}
                    </div>
                </div>
                <div v-if="statusCurrent === 2">
                    <div>{{ $t('popup.checkin') }}: {{ dialogItem.dateCheckin }}</div>
                    <div>{{ $t('popup.checkout') }}: {{ dialogItem.dateCheckout }}</div>
                </div>
                <div>
                    {{ $t('popup.customer') }}1: {{ dialogItem.riderName }}
                </div>
                <div v-if="statusCurrent === 1">
                    <div>
                        {{ $t('popup.vehicle') }}: {{ dialogItem.vehicle }}
                    </div>
                </div>
                <div>
                    {{ $t('popup.fee') }}: {{ dialogItem.price }}
                </div>
                <div class="total_price">
                    {{ $t('popup.totalAmount') }}: {{ dialogItem.price }}
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">

import { dayOfWeeks } from '../../constants/default'
import { ElDialog } from 'element-plus';

export default {
    components: {
        ElDialog
    },
    props: {
        isShowPopup: Boolean,
        statusCurrent: Number
    },
    data() {
        return {
            diglogVisible: false,
            dialogItem: {
                date: '2023.01.01 sat',
                riderName: 'Name1',
                vehicle: 'AB',
                price: '12.000',
                typeBook: 'type1',
                dateCheckin: '2023.01.01 sat',
                dateCheckout: '2023.01.02 sun',
                serviceType: "テニスコート"
            }
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
        isShowPopup(newValue) {
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
    @import "../../assets/scss/Popup.scss";
</style>