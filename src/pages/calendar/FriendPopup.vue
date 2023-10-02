<template>
    <el-dialog v-model="diglogVisible" :before-close="handleClose" v-if="diglogVisible">
        <div class="popup popup_friend">
            <div class="content-popup">
                <h5 class="title">{{ $t('popup.tlFriend') }}</h5>
                <div class="lst_friend">
                    <div v-for="item in lstFriend" :key="item.userid" 
                    class="friend-item" @click="handleFriend(item, 'friend')">
                    ★ {{ item.fullname }}
                    </div>
                    <div v-if="lstFriend.length == 0">{{ $t('popup.lblNotMember') }}</div>
                </div>
                
                <div class="group-input grid grid-cols-12 my-3">
                    <div class="col-span-8">
                        <input v-model="txtSearch"/>
                    </div>
                    <div class="col-span-4">
                        <button @click="handleSearch">{{$t('groupButton.btnSearch')}}</button>
                    </div>
                </div>
                <h5 class="title mt-10">{{ $t('popup.tlUnFriend') }}</h5>
                <div class="lst_friend">
                    <div v-for="item in lstUnFriend" :key="item" 
                    class="friend-item" @click="handleFriend(item, 'unfriend')">
                        ☆ {{ item.fullname }}
                    </div>
                    <div v-if="lstUnFriend.length == 0">{{ $t('popup.lblNotMember') }}</div>
                </div>
            </div>
            
            <div class="group-input grid my-3">
                <button class="submit" @click="handleClose">{{$t('groupButton.btnClose')}}</button>
            </div>
        </div>
    </el-dialog>
    <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">
import { ref } from 'vue'
//layout
import { ElDialog } from 'element-plus'
import Loading from '../../components/loading/Loading.vue'
//const
import { EQueryKey } from '../../enums/query-key'
//hooks
import useNotification from '../../hooks/useNotification'
import { useMutation, useQueryClient, useQuery } from 'vue-query'
//service
import { getListUnfriendByUserId, getListFriendByUserId, updateFriend } from '../../services/friendService'

export default {
    components: {
        ElDialog,
        Loading
    },
    props: {
        isShowPopupFriend: Boolean,
        userId: Number
    },
    emits: ['closeDialog'],
    setup(props) {
        const notify = useNotification()
        const queryClient = useQueryClient()
        let txtSearch = ref('')

        const { data: lstUnFriend, isLoading: loadingUnFriend } = useQuery([EQueryKey.UnFriend, props.userId, txtSearch.value], () => getListUnfriendByUserId({userId: props.userId, nameSearch: txtSearch.value}))
        const { data: lstFriend, isLoading: loadingFriend } = useQuery([EQueryKey.Friend, props.userId], () => getListFriendByUserId({userId: props.userId}))
        const { mutate: mutateUpdateFriend, isLoading: loadingUpdate } = useMutation(updateFriend)

        const handleSearch = () => {
            queryClient.invalidateQueries([EQueryKey.UnFriend, props.userId, '']);
        }

        return {
            notify,
            isLoading: loadingFriend || loadingUnFriend || loadingUpdate,
            queryClient,
            lstFriend,
            lstUnFriend,
            mutateUpdateFriend,
            txtSearch,
            handleSearch
        }
    },
     
    data() {
        return {
            diglogVisible: false
        }
    },

    watch: {
        isShowPopupFriend(newValue) {
            this.diglogVisible = newValue
        }
    },
    methods: {
        handleClose() {
            this.$emit("closeDialog")
        },

        async handleFriend(friend, nameHandle) {
            let codeMess = nameHandle === 'friend' ? "Q_0002" : "Q_0001"
            const result = await this.notify.notifyQuestion(codeMess, [friend.fullname])
            if(result.isConfirmed) {
                this.mutateUpdateFriend({userId: this.userId, friendId: friend.userid}, {
                    onSuccess: (newData) => {
                        if(newData) {
                            codeMess = nameHandle === 'friend' ? "S_0006" : "S_0005"
                            this.notify.nofifySuccess(codeMess, ["N0002"])
                            this.queryClient.invalidateQueries([EQueryKey.Friend, this.userId])
                            this.queryClient.invalidateQueries([EQueryKey.UnFriend, this.userId])
                            this.queryClient.invalidateQueries([EQueryKey.Customer, this.userId])
                        } else {
                            this.notify.notifyError("E_0005")
                        }
                    },
                    onError: () => {
                        this.notify.notifyError("E_0005")
                    }
                })
            }
        },

    }
}

</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Popup.scss";
</style>