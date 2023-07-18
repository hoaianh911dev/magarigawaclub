<template>
    <section class="section-main section-user">
        <div class="login-content">
            <div class="title_main">
                <h2>{{ $t('resetPassword.titleResetPassword') }}</h2>
            </div>
            <div class="describe_title">
                <p>{{ $t('resetPassword.noteResetPasswor') }}</p>
            </div>
            <div class="form_input">
                <div class="group-input">
                    <input :placeholder="$t('resetPassword.plNewPassword')" v-model="form.newPassword" 
                    name="newPassword" class="required password" :nameControl="$t('resetPassword.plNewPassword')"
                    type="password"/>
                    <span v-if="errors.newPassword" class="text-error">{{ errors.newPassword }}</span>
                </div>
                <div class="group-input">
                    <input :placeholder="$t('resetPassword.plConfirmNewPassword')"
                    name="confirmPassword" :nameControl="$t('resetPassword.plConfirmNewPassword')"
                    v-model="form.confirmNewPassword" 
                    type="password"/>
                    <span v-if="errors.confirmPassword" class="text-error">{{ errors.confirmPassword }}</span>
                </div>
                <div class="group-button">
                    <button class="btnSubmit"
                    @click="submitForm">{{ $t('groupButton.btnSend') }}</button>
                </div>
            </div>
        </div>
     </section>
     <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">

//layout
import Loading from '../../components/loading/Loading.vue'
//const
import { PATH } from '../../constants/path'
import { ResponseCode } from '../../enums/response'
import getMSG from "../../constants/message"
//hooks
import useFormValidation from '../../hooks/useFormValidation'
import useNotification from '../../hooks/useNotification'
import { useMutation, useQueryClient } from 'vue-query'
//service
import { updatePassword } from '../../services/userService'

export default {
    components: {
        Loading
    },
    setup() {
        const queryClient = useQueryClient()
        const notify = useNotification()

        const { mutate: mutateUpdayePass, isLoading } = useMutation(updatePassword,{
            onSuccess: () => {
                queryClient.invalidateQueries('password')
            }
        })

        return {
            mutateUpdayePass,
            isLoading,
            notify
        }
    },
    data() {
        return {
            form: {},
            errors: {},
            PATH: PATH,
            id: this.$route.params.id
        }
    },
    methods: {
        async submitForm() {
            this.errors = useFormValidation()
            //check password confirm
            if(this.form.confirmNewPassword != this.form.newPassword) {
                this.errors.confirmPassword = getMSG("E_0004")
            }
            if (Object.keys(this.errors).length > 0 || (this.form.confirmNewPassword != this.form.newPassword)) return

            try {
                this.mutateUpdayePass({id: this.id, password: this.form.confirmNewPassword}, {
                    onSuccess: (data) => {
                        if(data.code === ResponseCode.Ok) {
                            this.notify.nofifySuccess("S_0002")
                            this.$router.push(PATH.login.url)
                        } else {
                            this.notify.notifyError("E_0005")
                        }
                    },
                    onError: () => {
                        this.notify.notifyError("E_0005")
                    }
                })
            }
            catch(error) {
                this.notify.notifyError("E_0005")
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/Auth.scss';
</style>