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
                    name="newPassword" class="required" :nameControl="$t('resetPassword.plNewPassword')"
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
</template>

<script lang="ts">

import { PATH } from '../../constants/path'
import useFormValidation from '../../hooks/useFormValidation'
import { MSG } from "../../constants/mesage"

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
            //check password confirm
            if(this.form.confirmNewPassword != this.form.newPassword) 
                this.errors.confirmPassword = MSG.ERROR.E_0004

            if (Object.keys(this.errors).length > 0) return

            this.$router.push(PATH.login.url)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/Auth.scss';
</style>
