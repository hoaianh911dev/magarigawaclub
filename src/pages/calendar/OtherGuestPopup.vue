<template>
    <el-dialog v-model="diglogVisible" :before-close="handleClose" v-if="diglogVisible">
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
                <div class="group-input grid pb-0! pt-20">
                    <button @click="handleSaveCustomer" :disabled="!form.birthday || !form.fullName"
                    class="submit">{{$t('groupButton.btnSave')}}</button>
                </div>
            </div>
        </div>
    </el-dialog>
    <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">
//layout
import Loading from '../../components/loading/Loading.vue'
import { ElDialog, ElDatePicker } from 'element-plus'
//const
import { EQueryKey } from '../../enums/query-key'
//hooks
import useNotification from '../../hooks/useNotification'
import useLocalStorage  from '../../hooks/useLocalStorage'
import useHelper from '../../hooks/useHelper'
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
        userId: Number
    },
    setup() {

        const notify = useNotification()
        const storage = useLocalStorage()
        const queryClient = useQueryClient()
        const helper = useHelper()

        const { mutate: mutateCreateCustomer, isLoading } = useMutation(createCustomer)

        return {
            notify,
            mutateCreateCustomer,
            isLoading,
            storage,
            queryClient,
            helper
        }

    },
    data() {
        return {
            diglogVisible: false,
            birthday: '',
            form: {
                fullName: '',
                birthday: ''
            }
        }
    },
    emits: ['closeDialog'],
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
            
            let birthday = this.helper.formatDateDMYString(this.form.birthday)

            this.mutateCreateCustomer({fullname: this.form.fullName, birthday, userid: this.storage.userId}, {
                onSuccess: (newData) => {
                   if(newData) {
                        this.notify.nofifySuccess("S_0004", ["N0001"])
                        this.queryClient.invalidateQueries([EQueryKey.Customer, this.userId])
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
    @import "../../assets/scss/Popup.scss";
</style>