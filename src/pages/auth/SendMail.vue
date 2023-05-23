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
                    <input :placeholder="$t('resetPassword.plEmail')" v-model="form.email"/>
                </div>
            </div>
            <div class="describe_title mt-30">
                <p>{{ $t('resetPassword.noteSendMail3') }}</p>
                <p>{{ $t('resetPassword.noteSendMail4') }}</p>
            </div>
            <div class="group-button">
                <button class="btnSubmit" :disabled="!form.email"
                @click="$router.push(PATH.resetPassword.url)">{{ $t('groupButton.btnSend') }}</button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">

import { PATH } from '../../constants/path';

export default {
    data() {
        return {
            form: {
            },
            PATH: PATH
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/Auth.scss';
</style>