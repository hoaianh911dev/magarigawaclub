<template>
    <section class="section-main section-book">
        <TypeTabBooking :routeName="routeName"></TypeTabBooking>
        <div class="tab-group">
            <StatusTabBooking :routeName="routeName"></StatusTabBooking>
            <div class="tab-content">
                <div class="tab-panel">
                    <StayBook1 v-if="isStayBook === 1"
                    @submitStayBookHandler="submitStayBookHandler"
                    :formInput="formInput"></StayBook1>
                    <StayBook2 v-if="isStayBook === 2"
                    :formInput="formInput"
                    @submitStayBookHandler="submitStayBookHandler"></StayBook2>
                    <StayBook3 v-if="isStayBook === 3"
                    :formInput="formInput"></StayBook3>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">

import TypeTabBooking from '../../components/tabs/TypeTabBooking.vue'
import StatusTabBooking from '../../components/tabs/StatusTabBooking.vue'
import StayBook1 from './StayBook1.vue'
import StayBook2 from './StayBook2.vue'
import StayBook3 from './StayBook3.vue'

export default {
    components: {
        TypeTabBooking,
        StatusTabBooking,
        StayBook1,
        StayBook2,
        StayBook3
    },
    data() {
        return {
            routeName: this.$route.name,
            isStayBook: 1,
            formInput: {}
        }
    },
    methods: {
        submitStayBookHandler(data) {
            this.isStayBook = data.numberStayBook
        }
    },
}

</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>