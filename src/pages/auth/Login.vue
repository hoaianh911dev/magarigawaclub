<template>
    <NotifyMessage :show=isAlertConfirm :message=message
    @confirm="isAlertConfirm=false"></NotifyMessage>
    <section class="section-main">
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
                    <a>> {{ $t('login.forgetPassword') }}</a>
                </div>
                <div class="mt-30 mb-30">
                    <button class="btnSubmit" @click="SubmitForm">
                        {{ $t('login.btnLogin') }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">

import axios from '../../configs/axios'
import authEnpoint from '../../endpoints/auth.endpoint'
import { ResponseCode } from '../../enums/response'
import useAuth from '../../hooks/useAuth'
import NotifyMessage from '../../components/notify/NotifyMessage.vue'
import { MSG } from '../../constants/mesage'
import { PATH } from '../../constants/PATH'

export default {
    // created() {
    //     const { setUser } = useAuth()
    //     axios.post(authEnpoint.login, {email: 'bruno@email.com', password: 'bruno'}).then(function(response) {
//         if(response.data.code === ResponseCode.Ok) {
    //             setUser(JSON.stringify({email: 'bruno@email.com', 'accessToken': response.data.access_token}))
    //             console.log('response',response)
    //         }
            
    //     })
    // },
    components: {
        NotifyMessage
    },
    data() {
        return {
            errors: {},
            form: {},
            isAlertConfirm: false,
            message: ''
        }
    },
    methods: {
        async SubmitForm() {
            const { setUser } = useAuth()
            const response = await axios.post(authEnpoint.login, {email: this.form.email, password: this.form.password})
            if(response.data.code === ResponseCode.Ok) {
                setUser(JSON.stringify({email: 'bruno@email.com', 'accessToken': response.data.access_token}))
                this.$router.push(PATH.home.url)
            } else {
                console.log(this)
                this.isAlertConfirm = true
                this.message = MSG.ERROR.E_0001
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/Auth.scss';
</style>
