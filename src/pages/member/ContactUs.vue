<template>
    <div class="section-main section-member">
        <div class="title_main">
            <h2>{{ $t('member.titleContact') }}</h2>
        </div>
        <div class="form-input">
            <div class="group-input">
                <label class="title-input">{{ $t("member.lblSubject") }}</label>
                <input class="required" v-model="form.subject"
                    name="subject" :nameControl="$t('member.lblSubject')"/>
            </div>
            <div class="group-input">
                <label class="title-input">{{ $t("member.lblYourName") }}</label>
                <input class="required" v-model="form.subject"
                    name="subject" :nameControl="$t('member.lblYourName')"/>
            </div>
            <div class="group-input">
                <label class="title-input">{{ $t("member.lblReplyAddress") }}</label>
                <input class="required" v-model="form.subject"
                    name="subject" :nameControl="$t('member.lblReplyAddress')"/>
            </div>
            <div class="group-input">
                <label class="title-input">{{ $t("member.lblContent") }}</label>
                <textarea class="required" v-model="form.message"
                    name="message" :nameControl="$t('member.lblContent')" rows="5"></textarea>
            </div>
            <div class="group-button">
                <button class="btnSubmit">{{$t('groupButton.btnConfirmation')}}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            form: {}
        }
    },
}
</script>
<style lang="scss">
@import '../../assets/scss/Member.scss';
</style>