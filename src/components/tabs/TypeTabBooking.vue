<template>
    <ul class="menu_top" >
        <li :class="type === 'trip' || routeName.toLowerCase().includes('trip') ? 'active':''" @click="!isBooking ? this.$router.push('/trip-book') : $emit('updateType', 'trip')">
            <font-awesome-icon :icon="['fas', 'gear']" class="text-26 mb-10" :class="routeName.toLowerCase().includes('trip') ? 'active':''"/>
            <div>{{$t('groupButton.btnTrip')}}</div>
        </li>
        <li :class="type === 'stay' || routeName.toLowerCase().includes('stay') ? 'active':''" @click="!isBooking ? this.$router.push('/stay-book') : $emit('updateType', 'stay')">
            <font-awesome-icon :icon="['fas', 'bed']" class="text-26 mb-10" :class="routeName.toLowerCase().includes('trip') ? 'active':''"/>
            <div>{{$t('groupButton.btnStay')}}</div>
        </li>
        <li :class="type === 'facility' || routeName.toLowerCase().includes('facility') ? 'active':''" @click="!isBooking ? this.$router.push('/facility-book') : $emit('updateType', 'facility')">
            <font-awesome-icon :icon="['fas', 'house']" class="text-26 mb-10" :class="routeName.toLowerCase().includes('trip') ? 'active':''"/>
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
    },
    emits: ['updateType']

}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/TypeTabBooking.scss";
</style>