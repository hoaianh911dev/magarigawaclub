<template>
    <section class="section-main section-user">
        <div class="login-content">
            <div class="title_main">
                <h2>{{ $t('resetPassword.titleSendMail') }}</h2>
            </div>
            <div class="describe_title">
                <p>{{ $t('resetPassword.noteSendMail1') }}</p>
                <p>{{ $t('resetPassword.noteSendMail2') }}</p>
            </div>
            <div class="form_input">
                <div class="group-input">
                    <input :placeholder="$t('resetPassword.plEmail')" name="email"
                    class="required email" :nameControl="$t('resetPassword.plEmail')" v-model="form.email"/>
                    <span v-if="errors.email" class="text-error">{{ errors.email }}</span>
                </div>
            </div>
            <div class="describe_title mt-30">
                <p>{{ $t('resetPassword.noteSendMail3') }}</p>
                <p>{{ $t('resetPassword.noteSendMail4') }}</p>
            </div>
            <div class="group-button">
                <button class="btnSubmit"
                @click="submitForm">{{ $t('groupButton.btnSend') }}</button>
            </div>
        </div>
    </section>
    <Loading v-if="isLoading"></Loading>
</template>

<script lang="ts">
//layout
import Loading from '../../components/loading/Loading.vue'
//const
import { ResponseCode } from '../../enums/response'
import { PATH } from '../../constants/path'
import getMSG from '../../constants/message'
//hooks
import useFormValidation from '../../hooks/useFormValidation'
import useNotification from '../../hooks/useNotification'
import { useMutation, useQueryClient } from 'vue-query'
//service
import { checkEmailExist, sendMailResetPassword } from '../../services/userService'

export default {
    components: {
        Loading
    },
    setup() {

        const queryClient = useQueryClient()
        const notify = useNotification()
        

        const { mutate: mutateCheckMail, isLoading: loadingCheckMail } = useMutation(checkEmailExist,{
            onSuccess: () => {
                queryClient.invalidateQueries('email')
            }
        })

        const { mutate: mutateSendMail, isLoading: loadingSendMail} = useMutation(sendMailResetPassword)

        const isLoading = loadingCheckMail || loadingSendMail

        return {
            mutateCheckMail,
            mutateSendMail,
            isLoading,
            notify
        }
    },
    data() {
        return {
            form: {
                email: ''
            },
            errors: {
                email: ''
            },
            PATH: PATH
        }
    },
    methods: {
        async submitForm() {
            this.errors = useFormValidation()
            if (Object.keys(this.errors).length > 0) return
            try {
                this.mutateCheckMail({email: this.form.email}, {
                    onSuccess: (data) => {
                        if(data.code === ResponseCode.Ok) {
                            const id = data.id
                            this.mutateSendMail({id}, {
                                onSuccess: (data) => {
                                    if(data.code === ResponseCode.Ok) {
                                        this.notify.nofifySuccess('S_0001')
                                    } else {
                                        this.notify.notifyError('E_0005')
                                    }
                                },
                                onError: () => {
                                    this.notify.notifyError("E_0005")
                                }
                            })
                        } else {
                            this.errors.email = getMSG("E_0006", ["Email"])
                        }
                    },
                    onError: () => {
                        this.notify.notifyError("E_0005")
                    }
                })
            }
            catch(error) {
                this.notify.notifyError('E_0005')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/Auth.scss';
</style>