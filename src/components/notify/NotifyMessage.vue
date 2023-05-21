<template>
    <div v-if="show">
        <div class="wrapper-notify">
            <div class="content-notify">
                <div class="text-notify" v-html="message">
                </div>
                {{ mesage }}
                <div class="group-button">
                    <button class="button-confirm" @click="confirm">{{nameBtnSubmit}}</button>
                </div>
            </div>
        </div>
        <div class="overlay-notify"></div>
    </div>
</template>

<script>

export default {
    props: {
        show: {
            type: Boolean
        },
        message: {
            type: String
        },
        nameBtnSubmit: {
            type: String,
            default: 'Ok'
        }
    }, 

    methods: {
        confirm() {
            this.$emit('confirm')
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/NotifyMessage.scss";
</style>
