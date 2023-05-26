<template>
    <div class="section-main section-notice">
        <ThumbGallery :lstImage="lstImage" :isShowThumbSub="true"></ThumbGallery>
        <div class="content-main">
            <div class="datetime">{{ notice.datetime }}</div>
            <div class="title">{{ notice.title }}</div>
            <div class="content">{{ notice.content }}</div>
        </div>
        <div class="group-button">
            <button @click="$router.push('/')" class="btnSubmit">{{$t('groupButton.btnApplication')}}</button>
        </div>
    </div>
</template>

<script lang="ts">
import ThumbGallery from '../../components/image/ThumbGallery.vue'
export default {
    components: {
        ThumbGallery
    },
    data() {
        return {
            lstImage: ['https://swiperjs.com/demos/images/nature-1.jpg', 
                'https://swiperjs.com/demos/images/nature-2.jpg',
                'https://swiperjs.com/demos/images/nature-3.jpg',
                'https://swiperjs.com/demos/images/nature-4.jpg',
                'https://swiperjs.com/demos/images/nature-5.jpg',
                'https://swiperjs.com/demos/images/nature-6.jpg',
                'https://swiperjs.com/demos/images/nature-7.jpg',
                'https://swiperjs.com/demos/images/nature-8.jpg',
                'https://swiperjs.com/demos/images/nature-10.jpg'],
            notice: {
                datetime: '2022.4.1 wed 14:00',
                title: 'サーキット定期点検のお知らせ',
                content: `サーキット定期点検のお知らせ
                サーキット定期点検のお知らせサーキット定期点検 のお知らせサーキッ
                ト定期点検のお知らせサーキッ ト定期点検のお知らせサーキット定期点検
                のお知ら せサーキット定期点検のお知らせサーキット定期点 検のお知らせサ
                ーキット定期点検のお知らせサー キット定期点検のお知らせサーキット定期点検のお
                 知らせサーキット定期点検のお知らせサーキット定 期点検のお知らせサーキット
                 定期点検のお知らせ サーキット定期点検のお知らせ`
            }
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Event.scss';
</style>