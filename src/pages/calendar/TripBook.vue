<template>
    <section class="section-main section-book">
        <TypeTabBooking :routeName="routeName"></TypeTabBooking>
        <div class="tab-group">
            <StatusTabBooking :routeName="routeName"></StatusTabBooking>
            <div class="tab-content">
                <div class="tab-panel">
                    <TripBook1 v-if="isTripBook === 1"
                    :formInput="formInput"
                    :formatDate="formatDate"></TripBook1>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">

import TypeTabBooking from '../../components/tabs/TypeTabBooking.vue'
import StatusTabBooking from '../../components/tabs/StatusTabBooking.vue'
import TripBook1 from './TripBook1.vue'

import { dayOfWeeks } from '../../constants/default'

export default {
    components: {
        TypeTabBooking,
        StatusTabBooking,
        TripBook1
    },
    data() {
        return {
            routeName: this.$route.name,
            isTripBook: 1,
            formInput: {
                bookes: []
            },
            dateBook: this.$route.params.date || new Date()
        }
    },
    computed: {
        formatDate() {
            const date = new Date(this.dateBook)
            return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()} ${dayOfWeeks[date.getDay()]}`
        },
    },
}

</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>
