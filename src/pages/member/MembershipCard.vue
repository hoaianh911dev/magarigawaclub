<template>
    <div class="section-main section-member section-membership">
        <div class="content-wrapper">
            <div class="logo">
                <img src="/img/logobl.png" />
            </div>
            <div class="mt-10 text-center">{{ $t('member.regularMember') }}</div>
            <div class="mt-10">
                <vue-qrcode value="1" class="m-auto"
                :options="{ width: 130 }"></vue-qrcode>
            </div>
            <div class="text-center mt-10">
                {{ user.idUser }}
            </div>
            <div class="mt-10">
                <img src="/img/avatar.png" class="m-auto border-50%"/>
            </div>
            <div class="grid grid-cols-12 infor-item">
                <div class="col-span-3">{{ $t('member.lblName')}}</div>
                <div class="col-span-9">{{ user.name }}</div>
            </div>
            <div class="grid grid-cols-12 infor-item">
                <div class="col-span-3">{{ $t('member.lblBirthday')}}</div>
                <div class="col-span-9">{{ user.birth }}</div>
            </div>
            <div class="grid grid-cols-12 infor-item">
                <div class="col-span-3">{{ $t('member.lblAddress')}}</div>
                <div class="col-span-9">{{ user.address }}</div>
            </div>
            <div class="grid grid-cols-12 infor-item">
                <div class="col-span-3">{{ $t('member.lblTel') }}</div>
                <div class="col-span-9">{{ user.tel }}</div>
            </div>
        </div>
        <div class="button-group">
            <button @click="$router.push(PATH.myPage.url)">{{$t('groupButton.btnClose')}}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { PATH } from '../../constants/path'
export default {
    data() {
        return {
            user: {
                idUser: "000000000",
                name: "Anhs Truowng",
                birth: "1998.09.11",
                address: "QTSC1 OOOOOOOO",
                tel: '000-0000-0000'
            },
            PATH: PATH
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Member.scss';
</style>../../constants/path