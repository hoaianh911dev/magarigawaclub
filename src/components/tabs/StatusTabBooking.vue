<template>
    <div class="btn-group__tabs grid grid-cols-12" role="tablist">
        <button class="nav-link col-span-4" @click="!isBooking ? changeRoute('book') : $emit('updateNameActive', 'book')" 
        :class="{'active-stay': routeName === 'StayBook',
                'active-facility': routeName === 'FacilityBook',
                'active-trip': routeName === 'TripBook',
                'active-booking': tabNameActive === 'book'}">
            {{$t('groupButton.btnBooking')}}
        </button>
        <button class="nav-link col-span-4"  @click="!isBooking ? changeRoute('confirm') : $emit('updateNameActive', 'confirm')" 
        :class="{'active-stay': routeName === 'StayConfirm',
                'active-facility': routeName === 'FacilityConfirm',
                'active-trip': routeName === 'TripConfirm',
                'active-booking': tabNameActive === 'confirm'}">
            {{$t('groupButton.btnConfirmation')}}
        </button>
        <button class="nav-link col-span-4" @click="!isBooking ? changeRoute('history') : $emit('updateNameActive', 'history')"
        :class="{'active-stay': routeName === 'StayHistory',
                'active-facility': routeName === 'FacilityHistory',
                'active-trip': routeName === 'TripHistory',
                'active-booking': tabNameActive === 'history'}">
            {{$t('groupButton.btnHistory')}}
        </button>
    </div>
</template>

<script lang="ts">

    export default {
        props: {
            tabActiveIndex: Number,
            routeName: String,
            isBooking: {
                default: false,
                type: Boolean
            },
            tabNameActive: {
                default: '',
                type: String
            }
        },
        emits: ['updateNameActive'],
        methods: {
            changeRoute(nameRouteLast) {
                if(this.routeName.toLowerCase().includes('stay')) {
                    this.$router.push(`/stay-${nameRouteLast}`)
                } else if(this.routeName.toLowerCase().includes('facility')) {
                    this.$router.push(`/facility-${nameRouteLast}`)
                } else if(this.routeName.toLocaleLowerCase().includes('trip')) {
                    this.$router.push(`/trip-${nameRouteLast}`)
                }
            }, 
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../assets/scss/StatusTabBooking.scss";
</style>