<template>
    <section class="section-main section-book">
        <TypeTabBooking :routeName="routeName"></TypeTabBooking>
        <div class="tab-group">
            <StatusTabBooking :routeName="routeName"></StatusTabBooking>
            <div class="tab-content">
                <div class="tab-panel">
                    <TripBook1 v-if="isTripBook === 1"
                    :formInput="formInput"
                    :formatDate="formatDate"
                    @submitBookHandler="submitBookHandler"></TripBook1>
                    <TripBook2 v-if="isTripBook === 2"
                    :formInput="formInput"
                    :formatDate="formatDate"></TripBook2>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">

import TypeTabBooking from '../../components/tabs/TypeTabBooking.vue'
import StatusTabBooking from '../../components/tabs/StatusTabBooking.vue'
import TripBook1 from './TripBook1.vue'
import TripBook2 from './TripBook2.vue'

import { dayOfWeeks } from '../../constants/default'

export default {
    components: {
        TypeTabBooking,
        StatusTabBooking,
        TripBook1,
        TripBook2
    },
    data() {
        return {
            routeName: this.$route.name,
            isTripBook: 1,
            formInput: {
                booking: [],
                dateBook: this.$route.params.date || new Date()
            }
        }
    },
    computed: {
        formatDate() {
            const date = new Date(this.formInput.dateBook)
            return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()} ${dayOfWeeks[date.getDay()]}`
        },
    },
    methods: {
        submitBookHandler() {
            this.isTripBook = 2
        }
    },
}

</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>
