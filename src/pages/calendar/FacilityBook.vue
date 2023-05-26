<template>
     <section class="section-main section-book">
        <TypeTabBooking :routeName="routeName"></TypeTabBooking>
        <div class="tab-group">
            <StatusTabBooking :routeName="routeName"></StatusTabBooking>
            <div class="tab-content">
                <div class="tab-panel">
                    <FacilityBook1 v-if="isFacilityBook === 1"
                    :formInput="formInput"
                    @submitFacilityBookHandler="submitFacilityBookHandler"></FacilityBook1>
                    <FacilityBook2 v-if="isFacilityBook === 2"
                    :formInput="formInput"></FacilityBook2>
                </div>
            </div>
        </div>
     </section>
</template>

<script lang="ts">
import TypeTabBooking from '../../components/tabs/TypeTabBooking.vue'
import StatusTabBooking from '../../components/tabs/StatusTabBooking.vue'
import FacilityBook1 from './FacilityBook1.vue'
import FacilityBook2 from './FacilityBook2.vue'
export default {
    components: {
        TypeTabBooking,
        StatusTabBooking,
        FacilityBook1,
        FacilityBook2
    },
    data() {
        return {
            routeName: this.$route.name,
            isFacilityBook: 1,
            formInput: {
                date: '2023/03/03',
                shisetsuId: "プライベートダイニング ",
                time: '14:00 - 15:00'
            }
        }
    },
    methods: {
        submitFacilityBookHandler(facilityNumber) {
            this.isFacilityBook = facilityNumber
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Booking.scss';
</style>