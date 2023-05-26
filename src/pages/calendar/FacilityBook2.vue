<template>
    <div class="title-date">
        <div>{{ formatDate }}</div>
    </div>
    <div class="form-book">
        <div class="text-center">
            <div>{{ formInput.shisetsuId }}</div>
            <div>{{ formInput.time }}</div>
        </div>
        <div class="group-input grid grid-cols-12 mb-10">
            <div class="col-span-4 mb-10">
                <button class="btn_showPopupFriend"
                @click="isShowPopupFriend = true">{{$t('groupButton.btnFriend')}}</button>
            </div>
        </div>
        <div class="group-input grid grid-cols-12">
            <label class="col-span-5 title-input">{{$t('book.lblCustomer')}}</label>
            <div class="col-span-7">
                <select class="mb-10" v-for="(cus,index) in arrCustomer" v-model="guest[index]" 
                v-on:change="guest[index] === '友達(他の会員)' ? (isShowPopupOtherGuest = true) : cus.Name=guest[index]"
                :key="index">
                    <option v-for="item in arrTypeUser" :value="item" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="add-guest">
            <a @click="arrCustomer.push({})">
                <span>+{{$t('groupButton.btnAddMember')}}</span>
            </a>
        </div>
        <div class="group-button">
            <button :disabled="arrCustomer.findIndex(cus => cus.Name) == -1"
                @click="this.$router.push('/facility-confirm')">{{$t('groupButton.btnSave')}}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { dayOfWeeks, arrTypeUser } from '../../constants/default'
export default {
    props: {
        formInput: Object
    },
    data() {
        return {
            isShowPopupFriend: false,
            arrCustomer: [{}],
            guest: {},
            isShowPopupOtherGuest: false,
            arrTypeUser: arrTypeUser,
        }
    },
    computed: {
        formatDate() {
            const date = new Date(this.formInput.date)
            return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()} ${dayOfWeeks[date.getDay()]}`
        }
    }
}
</script>