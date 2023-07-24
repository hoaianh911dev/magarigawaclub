<template>
    <div class="section-main section-member section-membership">
        <div class="content-wrapper">
            <div class="logo">
                <img src="/img/logobl.png" />
            </div>
            <div class="mt-10 text-center capitalize">{{ user.type }}</div>
            <div class="mt-10">
                <vue-qrcode :value="user.id" class="m-auto"
                :options="{ width: 130 }"></vue-qrcode>
            </div>
            <div class="mt-14">
                <img :src="user.avatar" class="m-auto border-50%"/>
            </div>
            <div class="grid grid-cols-12 infor-item">
                <div class="col-span-3">{{ $t('member.lblName')}}</div>
                <div class="col-span-9">{{ user.name }}</div>
            </div>
            <div class="grid grid-cols-12 infor-item">
                <div class="col-span-3">{{ $t('member.lblBirthday')}}</div>
                <div class="col-span-9">{{ user.birthday }}</div>
            </div>
            <div class="grid grid-cols-12 infor-item">
                <div class="col-span-3">{{ $t('member.lblAddress')}}</div>
                <div class="col-span-9">{{ user.address }}</div>
            </div>
            <div class="grid grid-cols-12 infor-item">
                <div class="col-span-3">{{ $t('member.lblTel') }}</div>
                <div class="col-span-9">{{ formatBirthday(user.phonenumber) }}</div>
            </div>
        </div>
        <div class="button-group">
            <button @click="$router.push(PATH.myPage.url)">{{$t('groupButton.btnClose')}}</button>
        </div>
    </div>
    <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">
//layout
import Loading from '../../components/loading/Loading.vue'
//const
import { PATH } from '../../constants/path'
import { EQueryKey } from '../../enums/query-key'
//service
import { getDetailUserById } from '../../services/userService'
//hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import useHelper from '../../hooks/useHelper'
import { useQuery } from 'vue-query'

export default {
    components: {
        Loading
    },
    setup() {
        const { userId } = useLocalStorage() 
        const helper = useHelper()

        const { data: user, isLoading } = useQuery([EQueryKey.User, userId], () => getDetailUserById({userId: userId}))

        const formatBirthday = (text) => {
            return helper.formatPhone(text)
        }

        return {
            PATH,
            user,
            isLoading,
            formatBirthday
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/Member.scss';
</style>