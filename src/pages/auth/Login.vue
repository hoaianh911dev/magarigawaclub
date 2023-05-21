<template>
    <div class="login-content">
        <div class="logo_title">
            <img src="/img/logo.svg" />
        </div>
        <div class="form_login">
            <div>
                <input :placeholder="$t('login.lblEmail')" class="input_email"/>
            </div>
            <div>
                <input :placeholder="$t('login.lblPassword')" class="input_password" />
            </div>
            <div class="mt-8 text-end">
                <a>> {{ $t('login.forgetPassword') }}</a>
            </div>
            <div class="mt-30 mb-30">
                <button class="btnSubmit">
                    {{ $t('login.btnLogin') }}
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '../../assets/scss/Auth.scss';
</style>