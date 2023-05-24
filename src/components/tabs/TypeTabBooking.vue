<template>
    <ul class="menu_top" >
        <li :class="type === 'trip' || routeName.toLowerCase().includes('trip') ? 'active':''" @click="!isBooking ? this.$router.push('/trip-book') : $emit('updateType', 'trip')">
            <img src="/img/trip.png" class="menu_logo" />
            <img src="/img/trip_white.png" class="menu_logo active" />
            <div>{{$t('groupButton.btnTrip')}}</div>
        </li>
        <li :class="type === 'stay' || routeName.toLowerCase().includes('stay') ? 'active':''" @click="!isBooking ? this.$router.push('/stay-book') : $emit('updateType', 'stay')">
            <img src="/img/stay.png" class="menu_logo" />
            <img src="/img/stay_white.png" class="menu_logo active" />
            <div>{{$t('groupButton.btnStay')}}</div>
        </li>
        <li :class="type === 'facility' || routeName.toLowerCase().includes('facility') ? 'active':''" @click="!isBooking ? this.$router.push('/facility-book') : $emit('updateType', 'facility')">
            <img src="/img/facility.png" class="menu_logo" />
            <img src="/img/facility_white.png" class="menu_logo active" />
            <div>{{$t('groupButton.btnFacility')}}</div>
        </li>
    </ul>
</template>

<script lang="ts">

export default {
   
    props: {
        routeName: String,
        isBooking: {
            default: false,
            type: Boolean
        },
        type: {
            default: '',
            type: String
        }
    }

}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/TypeTabBooking.scss";
</style>