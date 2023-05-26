<template>
    <div class="section-main section-member">
        <div class="title_main">
            <h2>{{ $t('member.titleCheckin') }}</h2>
        </div>
        <div class="list_checkin">
            <div class="date grid grid-cols-12">
                <div class="title col-span-5">{{ $t('member.lblDateCheckin') }}</div>
                <div class="col-span-7">{{ date }}</div>
            </div>
            <div class="plan grid grid-cols-12">
                <div class="title col-span-5">{{ $t('member.lblPlan') }}</div>
                <div class="col-span-7">
                    <div v-for="item in lstCheckIn" :key="item" class="checkin_item">
                        <div class="type">
                            <button class="btnStatus mb-5"
                            :class="{'btnTrip': item.type === 'trip',
                                    'btnStay': item.type === 'stay'}">{{ item.type === 'trip' ? "走行" : 
                                                                   item.type === 'stay' ? "宿泊" : ""}}</button>
                        </div>
                        <div class="time" v-for="time in item.listTime" :key="time">
                            <div>{{ time }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="history">
                <div class="title">{{ $t('member.lbUsageHistory') }}</div>
                <div v-for="item in lstHistory" :key="item" class="history_item">
                    <span>{{ item.date }} {{ item.content }}</span>
                    <span>{{ item.price }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {
            date: '2023.2.10 fri',
            lstCheckIn: [
                {
                    type: 'trip',
                    listTime: ['Morning A/ 9:00 - 9:40', 'Morning B/ 10:20 - 11:00']
                }, {
                    type: 'stay',
                    listTime: ['A棟']
                }
            ],
            lstHistory: [
                {
                    date: '2023.2.10 fri',
                    content: '11:00 / SPA / ゲストA',
                    price: '¥15,000'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/Member.scss';
</style>
