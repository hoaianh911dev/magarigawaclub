<template>
    <div class="section-main section-member">
        <div class="title_main">
            <h2>{{ $t('member.titleGuestInfo') }}</h2>
        </div>
        <div class="list_guest">
            <div class="item_guest" v-for="(guest, index) in formattedDate" :key="guest">
                <h5 class="title_guest">{{ $t('member.lblGuest') }} {{index + 1}}</h5>
                <div class="info_guest grid grid-cols-12 mt-10">
                    <div class="col-span-3">
                        <button @click="$router.push(`${PATH.guestEdit.url}/${guest.id}`)">{{ $t('groupButton.btnEdit') }}</button>
                    </div>
                    <div class="col-span-9 grid grid-cols-12">
                        <div class="col-span-4">
                            {{ $t('member.lblName') }}
                        </div>
                        <div class="col-span-8">
                            {{ guest.name }}
                        </div>
                        <div class="col-span-4">
                            {{ $t('member.lblBirthday') }}
                        </div>
                        <div class="col-span-8">
                            {{ guest.formattedDate }}
                        </div>
                        <div class="col-span-4">
                            {{ $t('member.lblAddress') }}
                        </div>
                        <div class="col-span-8">
                            {{ guest.address }}
                        </div>
                        <div class="col-span-4">
                            {{ $t('member.lblTel') }}
                        </div>
                        <div class="col-span-8">
                            {{ guest.formatTel }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="group-button">
            <button @click="$router.push(PATH.guestEdit.url)">
                {{ $t('groupButton.btnCreate') }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { PATH } from '../../constants/path'
export default {
    data() {
        return {
            lstGuest: [{
                'id': 1,
                'name': 'Ferrari J50',
                'birth': '1998/11/09',
                'address': 'QTSC1, HCM',
                'tel': '03762061011'
            }, {
                'id': 2,
                'name': 'Ferrari J50',
                'birth': '1998/11/09',
                'address': 'QTSC1, HCM',
                'tel': '03762061011'
            }],
            PATH: PATH
        }
    },
    computed: {
        formattedDate() {
            return this.lstGuest.map(item => ({
                ...item,
                formattedDate: this.formatDate(item.birth),
                formatTel: this.formatTel(item.tel)
            }))
        }
    },
    methods: {
        formatDate(dateInput) {
            const date = new Date(dateInput)
            return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`
        },
        formatTel(tel) {
            const match = tel.match(/^(\d{3})(\d{4})(\d{4})$/);
            return `${match[1]}-${match[2]}-${match[3]}`
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/Member.scss';
</style>../../constants/path