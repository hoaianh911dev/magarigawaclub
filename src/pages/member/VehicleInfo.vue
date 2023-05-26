<template>
    <div class="section-main section-member">
        <div class="title_main">
            <h2>{{ $t('member.titleVehicleInfo') }}</h2>
        </div>
        <div class="list_guest list_vehicle">
            <div class="item_guest" v-for="(item,index) in lstVehicle" :key="index">
                <div class="title_guest title">{{$t('member.lblVehicle')}} {{ index+1 }}</div>
                <ThumbGallery :lstImage="item.images" :isShowThumbSub="true"></ThumbGallery>
                <div class="info_guest grid grid-cols-12 mt-3">
                    <div class="col-span-3">
                        <button @click="$router.push(`${PATH.vehicleEdit.url}/${item.id}`)">{{ $t('groupButton.btnEdit') }}</button>
                    </div>
                    <div class="col-span-9 grid grid-cols-12">
                        <div class="col-span-5 title">
                            {{$t('member.lblVehicle')}}
                        </div>
                        <div class="col-span-7">
                            {{ item.name }}
                        </div>
                        <div class="col-span-5 title">
                            {{$t('member.lblMaker')}}
                        </div>
                        <div class="col-span-7">
                            {{ item.producer }}
                        </div>
                        <div class="col-span-5 title">
                            {{$t('member.lblModelYear')}}
                        </div>
                        <div class="col-span-7">
                            {{ item.year }}
                        </div>
                        <div class="col-span-5 title">
                            {{$t('member.lblCategory')}}
                        </div>
                        <div class="col-span-7">
                            {{ item.type }}
                        </div>
                        <div class="col-span-5 title">
                            {{$t('member.lblStatus')}}
                        </div>
                        <div class="col-span-7">
                            {{ item.status }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="group-button">
            <button @click="$router.push(PATH.vehicleEdit.url)">
                {{ $t('groupButton.btnCreate') }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { PATH } from '../../constants/PATH'
import ThumbGallery from '../../components/image/ThumbGallery.vue'
export default {
    components: {
        ThumbGallery
    },
    data() {
        return {
            lstVehicle: [
                {
                    id: '1',
                    images: ['https://swiperjs.com/demos/images/nature-1.jpg', 'https://swiperjs.com/demos/images/nature-2.jpg'],
                    name: 'AB',
                    producer: 'Honda',
                    year: '2023',
                    type: 'Số',
                    status: 'Mới'
                },
            ],
            PATH: PATH
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Member.scss';
</style>