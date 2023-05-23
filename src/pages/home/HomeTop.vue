<template>
    <section class="section-main">
        <ThumbGallaryVue :lstImage="lstImage" :isShowThumbSub="false"></ThumbGallaryVue>
        <div class="content-main mx-auto max-w-95% px-2 sm:px-6 lg:px-8">
            <div class="content-item checkin_item">
                <div class="card">
                    <h1 class="title_item">Check in</h1>
                    <p class="text-center">2023.4.5 web</p>
                </div>
            </div>
            <div class="content-item reserve-item">
                <h1 class="title_item">Reserve
                    <span class="badge_item">soon</span>
                </h1>
                <div class="card flex items-center item_trip">
                    <div class="badget_status">Trip</div>
                    <div class="ml-5 sm:ml-10">
                        <div>2023.4.5 wed 9:00-9:40/10:20-11:00</div>
                        <div>Morning A</div>
                    </div>
                </div>
            </div>
            <div class="content-item">
                <h1 class="title_item">Information
                </h1>
                <div class="list_group">
                    <div class="list_group_item">
                        <div>2023.4.1</div>
                        <div>サーキット定期点検のお知らせ</div>
                    </div>
                    <div class="list_group_item">
                        <div>2023.4.1</div>
                        <div>サーキット定期点検のお知らせ</div>
                    </div>
                    <div class="list_group_item">
                        <div>2023.4.1</div>
                        <div>サーキット定期点検のお知らせ</div>
                    </div>
                </div>
            </div>
            <div class="content-item">
                <h1 class="title_item">Event
                </h1>
                <div class="list_group">
                    <div class="list_group_item">
                        <div>2023.4.1</div>
                        <div>走行イベント</div>
                    </div>
                    <div class="list_group_item">
                        <div>2023.4.1</div>
                        <div>走行イベント</div>
                    </div>
                    <div class="list_group_item">
                        <div>2023.4.1</div>
                        <div>走行イベント</div>
                    </div>
                </div>
            </div>
            <div class="content-item reserve-item">
                <h1 class="title_item">Reserve
                </h1>
                <div class="list_group">
                    <div class="list_group_item card flex items-center item_trip">
                        <div class="badget_status">Trip</div>
                        <div class="ml-5 sm:ml-10">
                            <div>2023.4.5 wed 9:00-9:40 / 10:20-11:00</div>
                            <div>Morning A</div>
                        </div>
                    </div>
                    <div class="list_group_item card flex items-center item_stay">
                        <div class="badget_status">Stay</div>
                        <div class="ml-5 sm:ml-10">
                            <div>2023.4.5 wed 9:00-9:40 / 10:20-11:00</div>
                            <div>Morning A</div>
                        </div>
                    </div>
                    <div class="list_group_item card flex items-center item_facility">
                        <div class="badget_status">Facility</div>
                        <div class="ml-5 sm:ml-10">
                            <div>2023.4.5 wed 9:00-9:40 / 10:20-11:00</div>
                            <div>Morning A</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-item reserve-item">
                <h1 class="title_item">Reserve
                </h1>
                <div class="tab_panel">
                    <div class="btn-group__tabs row" role="tablist">
                        <button class="nav-link col-4">
                            Trip
                        </button>
                        <button class="nav-link col-4">
                            Stay
                        </button>
                        <button class="nav-link col-4">
                            Facility
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import ThumbGallaryVue from '../../components/image/ThumbGallery.vue'
export default {
    components: {
        ThumbGallaryVue
    },
    data() {
        return {
            lstImage: ['/img/banner1.jpg',
                        'https://thietkehaithanh.com/wp-content/uploads/2023/02/banner-card-tutorial-photoshop.jpg']
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/HomeTop.scss';
</style>