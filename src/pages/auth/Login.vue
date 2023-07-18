<template>
    <section class="section-main section-user section-login">
        <div class="login-content">
            <div class="logo_title">
                <img src="/img/logo.svg" />
            </div>
            <div class="form_login">
                <div>
                    <input :placeholder="$t('login.lblEmail')" class="input_email" v-model="form.email"/>
                </div>
                <div>
                    <input :placeholder="$t('login.lblPassword')" class="input_password" 
                    type="password"
                    v-model="form.password"/>
                </div>
                <div class="mt-8 text-end">
                    <a @click="$router.push(PATH.sendMail.url)">> {{ $t('login.forgetPassword') }}</a>
                </div>
                <div class="mt-30 mb-30">
                    <button class="btnSubmit" @click="SubmitForm">
                        {{ $t('login.btnLogin') }}
                    </button>
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
import { ResponseCode } from '../../enums/response'
import { PATH } from '../../constants/path'
//hooks
import useLocalStorage  from '../../hooks/useLocalStorage'
import useNotification from '../../hooks/useNotification'
import { useMutation, useQueryClient } from 'vue-query'
//service
import { login } from '../../services/userService'

export default {
    components: {
        Loading
    },
    setup() {

        const notify = useNotification()
        const storage = useLocalStorage()
        const queryClient = useQueryClient()

        const { mutate, isLoading } = useMutation(login, {
            onSuccess: () => {
                queryClient.invalidateQueries("user")
            },
        })

        return { 
            notify,
            storage,
            mutate,
            isLoading
        }
    },
    data() {
        return {
            errors: {},
            form: {
                email: '',
                password: ''
            },
            PATH: PATH,
        }
    },
    methods: {
        async SubmitForm() {
            this.mutate({email: this.form.email, password: this.form.password}, {
                onSuccess: (data) => {
                   if(data.code === ResponseCode.Ok) {
                        this.notify.nofifySuccess("S_0003")
                        this.storage.setUser(JSON.stringify({email: this.form.email, 'accessToken': data.access_token, 'id': data.id}))
                        this.$router.push(PATH.home.url)
                    } else {
                        this.notify.notifyError("E_0001")
                    }
                },
                onError: () => {
                    this.notify.notifyError("E_0005")
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/Auth.scss';
</style>