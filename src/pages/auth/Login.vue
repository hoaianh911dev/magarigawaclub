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
</template>

<script lang="ts">

import { ResponseCode } from '../../enums/response'
import { MSG } from '../../constants/mesage'
import { PATH } from '../../constants/path'
import { login } from '../../hooks/useAuthApi'
import useAuth from '../../hooks/useAuth'

export default {
    data() {
        return {
        errors: {},
            form: {},
            PATH: PATH
        }
    },
    methods: {
        async SubmitForm() {
            const { setUser } = useAuth()
            const response = await login(this.form.email, this.form.password)
            if(response.data.code === ResponseCode.Ok) {
                this.$swal({
                    icon: 'success',
                    text: MSG.SUCCESS.S_0003
                }).then(() => { 
                    setUser(JSON.stringify({email: this.form.email, 'accessToken': response.data.access_token, 'id': response.data.id}))
                    this.$router.push(PATH.home.url)
                })
            } else {
                this.$swal({
                    icon: 'error',
                    text: MSG.ERROR.E_0001
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/Auth.scss';
</style>
