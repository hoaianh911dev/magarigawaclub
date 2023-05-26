<template>
    <div class="section-main section-member">
        <div class="title_main">
            <h2>{{ $t('member.titleVehicleInfo') }}</h2>
        </div>
        <div class="form-input">
            <div class="group-input">
                <label class="title-input">{{ $t("member.lblVehicle") }}</label>
                <input class="form-control required" name="vehicle"
                :nameControl="$t('member.lblVehicle')"/>
            </div>
            <div class="group-input">
                <label class="title-input">{{ $t("member.lblMaker") }}</label>
                <select class="required col-12 required" name="producer"  
                    :nameControl='$t("member.lblMaker")'>
                    <option v-for="item in lstProducer" :key="item" :value="item">{{ item }}</option>
                </select>
            </div>
            <div class="group-input">
                <label class="title-input">{{ $t("member.lblModelYear") }}</label>
                <select class="required col-12 required" name="producer"  
                    :nameControl='$t("member.lblModelYear")'>
                    <option v-for="item in lstProducer" :key="item" :value="item">{{ item }}</option>
                </select>
            </div>
            <div class="group-input">
                <label class="title-input">{{ $t("member.lblCategory") }}</label>
                <select class="required col-12 required" name="producer"  
                    :nameControl='$t("member.lblCategory")'>
                    <option v-for="item in lstProducer" :key="item" :value="item">{{ item }}</option>
                </select>
            </div>
            <div class="group-button">
                <button class="btnDelImg">{{$t('groupButton.btnDelete')}}</button>
                <button class="btnAddImg">{{$t('groupButton.btnAdd')}}</button>
            </div>
            <div class="group-button">
                <button @click="submitForm" class="btnSubmit">{{$t('groupButton.btnSave')}}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            lstProducer: ['', 'Producer1', 'Producer2'],
        }
    },
    methods: {
        submitForm() {
            this.$router.push('/vehicle-info')
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/Member.scss';
</style>