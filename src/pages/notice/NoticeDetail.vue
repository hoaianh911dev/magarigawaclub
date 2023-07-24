<template>
    <div class="section-main section-notice">
        <ThumbGallery :lstImage="notice[0].lstImg" :isShowThumbSub="true"
        v-if="notice[0].lstImg"></ThumbGallery>
        <div class="content-main">
            <div class="datetime">{{ notice[0].created }}</div>
            <div class="title">{{ notice[0].title }}</div>
            <div class="content">{{ notice[0].content }}</div>
        </div>
    </div>
    <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">
//layout
import Loading from '../../components/loading/Loading.vue'
import ThumbGallery from '../../components/image/ThumbGallery.vue'
//hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import { useQuery } from 'vue-query'
import { useRoute } from 'vue-router'
//const
import { EQueryKey } from '../../enums/query-key'
//service
import { getNoticeById } from '../../services/noticeService'

export default {
    components: {
        ThumbGallery,
        Loading
    },
    setup() {
        const storage = useLocalStorage()  
        const route = useRoute()
        const { userId } = storage
        const noticeId = route.params.id

        const { data: lstNotice, isLoading } = useQuery([EQueryKey.Notice, userId, noticeId], () => getNoticeById({id: noticeId}))

        return {
            isLoading,
            notice: lstNotice,
            noticeId
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/Event.scss';
</style>