<template>
    <div class="thumb_gallery">
        <swiper
        :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-navigation-size': '25px',
        }"
        :spaceBetween="10"
        :thumbs="{ swiper: swiperRef }"
        :modules="modules"
        :slides-per-view="1"
        navigation
        :autoplay="{
            'delay': 4000,
            'disableOnInteraction': false
        }"
        :loop="true"
        class="thumb_main" v-if="lstImage.length > 0">
            <swiper-slide v-for="(item,index) in lstImage" :key="index">
                <img :src="item" />
            </swiper-slide>
        </swiper>
        <swiper
            @swiper="setThumbsSwiper"
            :spaceBetween="10"
            :slidesPerView="isIpad ? 5 : 4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="thumb_sub" v-if="lstImage.length > 1 && isShowThumbSub">
            <swiper-slide v-for="(item, index) in lstImage " :key="index" @click.stop="slide=index">
                <img :src="item" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script lang="ts">

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Thumbs, Navigation, Autoplay } from 'swiper'
import { ref } from 'vue'

export default {
    data () {
        return {
            imageActive: '',
            indexActive: 0,
            isIpad: false
        }
    },

    components: {
        Swiper,
        SwiperSlide,
    },

    setup() {
        const slide = ref(0)
        const swiperRef = ref(null)
        const setThumbsSwiper = (swiper) => {
            swiperRef.value = swiper;
        }
        

        return {
            modules: [Thumbs, Navigation, Autoplay],
            setThumbsSwiper,slide,swiperRef
        };
    },
    watch: {
        lstImage: {
            handler() {
                this.setThumbsSwiper(null)
            },
            deep: true
        }
    },

    props: {
        lstImage: Array,
        isShowThumbSub: Boolean
    },

    created() {
        if (this.lstImage)
            this.imageActive = this.lstImage[0]
        this.isIpad = this.checkIpad()
    },

    methods: {
        checkIpad() {
            if(/iPad/.test(navigator.platform)) return true
            else return /MacIntel/.test(navigator.platform)
        }
    },

}

</script>

<style lang="scss" scoped>
    @import "../../assets/scss/ThumbGallery.scss";
</style>