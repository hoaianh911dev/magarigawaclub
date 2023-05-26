<template>
    <div class="section-main section-notice">
        <div class="list_notice">
            <div class="item_notice" v-for="notice in listNotice" :key="notice.id"
            @click="$router.push(`${ PATH.noticeDetail.url }/${notice.id}`)">
                <div>{{ notice.datetime }}</div>
                <div>{{ notice.content }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PATH } from '../../constants/PATH'
export default {
    data() {
        return {
            listNotice: [
                {
                    id: 1,
                    datetime: '2022.4.1 wed 14:00',
                    content: 'サーキット定期点検のお知らせ'
                },
                {
                    id: 2,
                    datetime: '2022.4.1 wed 14:00',
                    content: 'サーキット定期点検のお知らせ'
                },
                {
                    id: 3,
                    datetime: '2022.4.1 wed 14:00',
                    content: 'サーキット定期点検のお知らせ'
                },
                {
                    id: 4,
                    datetime: '2022.4.1 wed 14:00',
                    content: 'サーキット定期点検のお知らせ'
                }
            ],
            PATH: PATH
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Event.scss';
</style>