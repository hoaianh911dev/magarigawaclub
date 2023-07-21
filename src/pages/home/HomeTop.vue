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
                    <div class="btn-group__tabs grid grid-cols-3" role="tablist">
                        <button class="nav-link col-4 btnTrip" 
                        :class="{'active': tabActiveIndex === 1}"
                        @click="tabActiveIndex = 1">
                            Trip
                        </button>
                        <button class="nav-link col-4 btnStay" :class="{'active': tabActiveIndex === 2}"
                        @click="tabActiveIndex = 2">
                            Stay
                        </button>
                        <button class="nav-link col-4 btnFacility" :class="{'active': tabActiveIndex === 3}"
                        @click="tabActiveIndex = 3">
                            Facility
                        </button>
                    </div>
                    <div class="tab-content mt-20">
                        <div v-if="tabActiveIndex === 1 || tabActiveIndex === 2 || tabActiveIndex === 3">
                            <div class="grid grid-cols-12 gap-5 group-input">
                                <div class="col-span-3 title">Số lượng</div>
                                <div class="col-span-9">
                                    <select>
                                        <option v-for="item in arrPeople" :key="item">{{ item }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-5 group-input">
                                <div class="col-span-3 title">Ngày</div>
                                <div class="col-span-9 custome_date">
                                    <el-date-picker
                                    type="date"
                                    format="YYYY.M.DD ddd" 
                                    v-model="test"
                                    :disabledDate="disabledDate"
                                    ></el-date-picker>
                                </div>
                            </div>
                            <div class="show-more">
                                <a class="btnMore" @click="isShowMore = !isShowMore">
                                    <span v-if="!isShowMore">▲ </span>
                                    <span v-else>▼ </span>もっと詳しく設定する
                                </a>
                            </div>
                            <div class="content-more" v-if="isShowMore">
                                <div class="grid grid-cols-12 gap-5 group-input">
                                    <div class="col-span-3 title">Thứ</div>
                                    <div class="col-span-9 grid grid-cols-12">
                                        <label class="group-checkbox col-span-4">MON
                                            <input type="checkbox">
                                            <span class="custome-checkbox"></span>
                                        </label>
                                        <label class="group-checkbox col-span-4">TUE
                                            <input type="checkbox">
                                            <span class="custome-checkbox"></span>
                                        </label>
                                        <label class="group-checkbox col-span-4">WEB
                                            <input type="checkbox">
                                            <span class="custome-checkbox"></span>
                                        </label>
                                        <label class="group-checkbox col-span-4">THU
                                            <input type="checkbox">
                                            <span class="custome-checkbox"></span>
                                        </label>
                                        <label class="group-checkbox col-span-8">FRI
                                            <input type="checkbox">
                                            <span class="custome-checkbox"></span>
                                        </label>
                                        <label class="group-checkbox col-span-4">SAT
                                            <input type="checkbox">
                                            <span class="custome-checkbox"></span>
                                        </label>
                                        <label class="group-checkbox col-span-4">SUN
                                            <input type="checkbox">
                                            <span class="custome-checkbox"></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="grid grid-cols-12 gap-5 group-input">
                                    <div class="col-span-3 title">Loại</div>
                                    <div class="col-span-9">
                                        <select>
                                            <option v-for="item in lstType" :key="item">{{ item }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="grid grid-cols-12 gap-5 group-input">
                                    <div class="col-span-3 title">Tự chạy</div>
                                    <label class="col-span-9 group-checkbox">
                                        <input type="checkbox">
                                        <span class="custome-checkbox"></span>Khả thi
                                    </label>
                                </div>
                            </div>
                            <div class="group-button">
                                <button>Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-calendar">
            <div class="custome-header-calendar">
                <table class="el-calendar-table ">
                    <thead>
                        <th v-for="day in dayOfWeeks" :key="day">{{ day }}</th>
                    </thead>
                </table>
            </div>
            <el-calendar ref="calendar">
                <template #header="{ date }">
                    <div class="custom-header mx-auto max-w-95% px-2 sm:px-6 lg:px-8">
                        <el-button-group>
                            <el-button size="small" class="custom-header-btn"
                                @click="selectDate('prev-month')">&lt;</el-button>
                        </el-button-group>
                        <span>{{ formattedDate(date) }}</span>
                        <el-button-group>
                            <el-button size="small" class="custom-header-btn"
                                @click="selectDate('next-month')">&gt;</el-button>
                        </el-button-group>
                    </div>
                </template>
                <template #date-cell="{ data }">
                    <div :data-day="data.day" 
                    :disabled = "new Date(data.day).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) ">
                        {{ data.day.split('-').slice(2)[0] }}
                    </div>
                </template>
            </el-calendar>
        </div>
        <div class="group-button mb-30">
            <button>Lưu</button>
        </div>
    </section>
    <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">

import ThumbGallaryVue from '../../components/image/ThumbGallery.vue'
import { arrNumber, dayOfWeeks } from '../../constants/default'
import Loading from '../../components/loading/Loading.vue'

import { ElDatePicker, ElCalendar } from 'element-plus'
import { ref } from 'vue'

export default {
    components: {
        ThumbGallaryVue,
        ElDatePicker,
        ElCalendar,
        Loading
    },
    data() {
        return {
            lstImage: ['/img/banner1.jpg',
                        'https://thietkehaithanh.com/wp-content/uploads/2023/02/banner-card-tutorial-photoshop.jpg'],
            tabActiveIndex: 1,
            arrPeople: arrNumber,
            disabledDate(time) {
                return time.getTime() < Date.now()
            },
            test: '',
            isShowMore: false,
            dayOfWeeks: dayOfWeeks,
            lstType: [
                '', 'Type1', 'Type2'
            ],
            dataStayBook: [
                {
                    "status" : 1,
                    "day": '2023-04-15'
                },
                {
                    "status" : 2,
                    "day": '2023-04-15'
                }
            ],
            isLoading: false
        }
    },
    setup() {
        const calendar = ref();
        const selectDate = (val) => {
            calendar.value.selectDate(val);
        };
        return {
            calendar,
            selectDate,
        };
        
    },
    methods: {
        formattedDate(val) {
            const [year, month] = val.toString().split("  ");
            const monthIndex = new Date(`${month} 1, 2021`).getMonth() + 1;
            const formattedMonth = `${monthIndex}`;
            return `${year} . ${formattedMonth} ${month} `;
        },
    },
    created() {
        this.isLoading = true
        console.log('call api')
        this.isLoading = false
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/HomeTop.scss';
</style>