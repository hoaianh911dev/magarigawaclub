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
</template>

<script lang="ts">

import { PATH } from '../../constants/path';
import useFormValidation from '../../hooks/useFormValidation'

export default {
    data() {
        return {
            form: {},
            errors: {},
            PATH: PATH
        }
    },
    methods: {
        submitForm() {
            this.errors = useFormValidation()
            if (Object.keys(this.errors).length > 0) return
            this.$router.push(PATH.resetPassword.url)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/Auth.scss';
</style>