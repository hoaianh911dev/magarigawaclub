<template>
    <div class="section-main section-member">
        <div class="title_main">
            <h2>{{ $t('member.titleFriend') }}</h2>
        </div>
        <div class="content_friend">
            <div v-for="item in getListArrMemberIsFriend" :key="item" 
                class="friend-item" @click="item.FLG_FRIEND = 0">
                ★ {{ item.NAME }}
            </div>
            <div class="group-input grid grid-cols-12 my-3 gap-10">
                <div class="col-span-8">
                    <input v-model="txtSearch"/>
                </div>
                <div class="col-span-4">
                    <button @click="search">{{$t('groupButton.btnSearch')}}</button>
                </div>
            </div>
            <div v-for="item in getListArrMemberNotFriend" :key="item" 
            class="friend-item" @click="item.FLG_FRIEND = 1">
                ☆ {{ item.NAME }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            arrMember: [
                {
                    NAME: '山田太郎',
                    FLG_FRIEND: 1 
                },
                {
                    NAME: '鈴木一郎',
                    FLG_FRIEND: 1
                }, 
                {
                    NAME: '佐藤次郎',
                    FLG_FRIEND: 1
                },
                {
                    NAME: '高橋三郎',
                    FLG_FRIEND: 1
                },
                {
                    NAME: '鈴木直道',
                    FLG_FRIEND: 0
                },
                {
                    NAME: '三村慎吾',
                    FLG_FRIEND: 0,
                },
                {
                    NAME: '増田卓也',
                    FLG_FRIEND: 0
                },
                {
                    NAME: '井村かおり',
                    FLG_FRIEND: 0
                },
                {
                    NAME: '佐竹信久',
                    FLG_FRIEND: 0
                },
                {
                    NAME: '吉村美恵子',
                    FLG_FRIEND: 0
                },
                {
                    NAME: '堀内孝雄',
                    FLG_FRIEND: 0
                }
            ],
        }
    },
    computed: {
        getListArrMemberIsFriend() {
            return this.arrMember.filter(m => m.FLG_FRIEND === 1)
        },
        getListArrMemberNotFriend() {
            return this.arrMember.filter(m => m.FLG_FRIEND === 0)
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Member.scss';
</style>