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
                    type="password"/>
                </div>
                <div class="group-input">
                    <input :placeholder="$t('resetPassword.plConfirmNewPassword')" v-model="form.confirmNewPassword" 
                    type="password"/>
                </div>
                <div class="group-button">
                    <button class="btnSubmit" :disabled="!form.newPassword && !form.confirmNewPassword"
                    @click="$router.push(PATH.login.url)">{{ $t('groupButton.btnSend') }}</button>
                </div>
            </div>
        </div>
     </section>
</template>

<script lang="ts">

import { PATH } from '../../constants/path'

export default {
    data() {
        return {
            form: {},
            PATH: PATH
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/Auth.scss';
</style>
