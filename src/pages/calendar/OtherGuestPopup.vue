<template>
    <el-dialog v-model="diglogVisible" :before-close="handleClose">
        <div class="popup popup_otherGuest">
            <div class="content-popup">
                <p class="mt-2">{{ $t('popup.noteOtherGuest') }}</p>
                <div class="group-input grid grid-cols-12">
                    <label class="col-span-4 title-input">{{ $t('popup.fullName') }}</label>
                    <div class="col-span-8">
                        <input v-model="form.fullName"/>
                    </div>
                </div>
                <p class="mt-2">{{ $t('popup.noteOtherGuest1') }}</p>
                <div class="group-input grid grid-cols-12">
                    <label class="col-span-4 title-input">{{ $t('popup.birthday') }}</label>
                    <div class="col-span-8 custome_date">
                        <el-date-picker
                        v-model="form.birthday"
                        type="date"
                        format="DD/MM/YYYY"
                        :disabled-date="disabledDate" 
                        />
                    </div>
                </div>
                <div class="group-button pb-0!">
                    <button @click="handleSaveCustomer" :disabled="!form.birthday || !form.fullName">{{$t('groupButton.btnSave')}}</button>
                </div>
            </div>
        </div>
    </el-dialog>
    <Loading v-if="isLoading"></Loading>
</template>

<script>
//layout
import Loading from '../../components/loading/Loading.vue'
import { ElDialog, ElDatePicker } from 'element-plus'
//const
import { dayOfWeeks } from '../../constants/default'
import { EQueryKey } from '../../enums/query-key'
import { ResponseCode } from '../../enums/response'
//hooks
import useNotification from '../../hooks/useNotification'
import useLocalStorage  from '../../hooks/useLocalStorage'
import { useMutation, useQueryClient } from 'vue-query'
//service
import { createCustomer } from '../../services/customerService'

export default {
    components: {
        ElDialog,
        ElDatePicker,
        Loading
    },
    props: {
        isShowPopupOtherGuest: Boolean,
        userId: String
    },
    setup(props) {

        const notify = useNotification()
        const storage = useLocalStorage()
        const queryClient = useQueryClient()

        const { mutate: mutateCreateCustomer, isLoading } = useMutation(createCustomer)

        return {
            notify,
            mutateCreateCustomer,
            isLoading,
            storage,
            queryClient
        }

    },
    data() {
        return {
            diglogVisible: false,
            birthday: '',
            form: {}
        }
    },
    watch: {
        isShowPopupOtherGuest(newValue) {
            this.diglogVisible = newValue
        }
    },
    methods: {

        disabledDate(date) {
            const dayChoose = new Date(date)
            const dayCurrent = new Date()

            const yearChoose = dayChoose.getFullYear()
            const yearCurrent = dayCurrent.getFullYear()
   
            if((yearCurrent - yearChoose) < 15) return true
            return false
        },

        handleClose() {
            this.$emit("closeDialog")
        },

        handleSaveCustomer() {

            const options = { year: "numeric", month: "2-digit", day: "2-digit" };
            let birthday = (new Date(this.form.birthday)).toLocaleDateString("en-US", options)

            this.mutateCreateCustomer({fullname: this.form.fullName, birthday, userid: this.storage.userId}, {
                onSuccess: (newData) => {
                   if(newData) {
                        this.notify.nofifySuccess("S_0004", ["N0001"])
                        this.queryClient.invalidateQueries([EQueryKey.customer, this.userId])
                    } else {
                        this.notify.notifyError("E_0005")
                    }
                },
                onError: () => {
                    this.notify.notifyError("E_0005")
                }
            })

            this.$emit("closeDialog")
        }
    }
}

</script>

<style lang="scss" scoped>
    @import "../../assets/scss/popup.scss";
</style>