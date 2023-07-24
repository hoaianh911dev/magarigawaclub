<template>
    <div class="section-main section-notice">
        <div class="list_notice">
            <div class="item_notice" v-for="notice in lstNotice" :key="notice.id"
            @click="$router.push(`${ PATH.noticeDetail.url }/${notice.id}`)">
                <div>{{ notice.created }}</div>
                <div>{{ notice.title }}</div>
            </div>
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
//hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import { useQuery } from 'vue-query'
//service
import { getListNoticeByUserId } from '../../services/noticeService'

export default {
    components: {
        Loading
    },
    setup() {
        const storage = useLocalStorage()  
        const { userId } = storage

        const { data: lstNotice, isLoading } = useQuery([EQueryKey.Notice, userId], () => getListNoticeByUserId({userId: userId}))

        return {
            lstNotice,
            isLoading,
            PATH
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/Event.scss';
</style>