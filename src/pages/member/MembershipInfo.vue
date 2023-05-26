<template>
    <div class="section-main section-member">
        <div class="form-input">
            <h5 class="title-input-main">{{ $t("member.lblYourName") }}</h5>
            <div class="group-input grid grid-cols-12 gap-16">
                <div class="col-span-6">
                    <label class="title-input">{{ $t("member.lblSurname") }}</label>
                    <input class="form-control required" :placeholder="$t('member.lblSurname')" 
                    name="surname" :nameControl="$t('member.lblsurname')" v-model="form.surname"/>
                </div>
                <div class="col-span-6">
                    <label class="title-input">{{ $t("member.lblName") }}</label>
                    <input class="form-control required" :placeholder="$t('member.lblName')"
                    name="firstname" :nameControl='$t("member.lblName") ' v-model="form.name"/>
                </div>
            </div>
            <h5 class="title-input-main">{{ $t("member.lblAddress") }}</h5>
            <div class="group-input grid grid-cols-12">
                <div class="col-span-6">
                    <label class="title-input">{{$t("member.lblZipCode")}}</label>
                    <input class="form-control required number onebyte number" :placeholder="$t('member.lblZipCode')"
                    name="zipcode" :nameControl='$t("member.lblpostcode")' v-model="form.zipcode"
                    maxlength="7" autocomplete="off" inputmode="numeric"/>
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <div class="col-span-6">
                    <label class="title-input">{{$t("member.lblCity")}}</label>
                    <select class="required col-12" name="city" 
                    :nameControl='$t("member.lblCity")' v-model="form.city">
                        <option v-for="item in lstCity" :key="item" :value="item">{{ item }}</option>
                    </select>
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <div class="col-span-12">
                    <label class="title-input">{{$t("member.lblAddressDetail")}}</label>
                    <input class="form-control required" :placeholder="$t('member.lblAddressDetail')" 
                    name="city" :nameControl='$t("member.lblAddressDetail")' v-model="form.addressDetail"/>
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <div class="col-span-12">
                    <label class="title-input">{{$t("member.lblAddressHouse")}}</label>
                    <input class="form-control required" :placeholder="$t('member.lblAddressHouse')" 
                    name="city" :nameControl='$t("member.lblAddressHouse")' v-model="form.addressHouse"/>
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <div class="col-span-12">
                    <label class="title-input">{{$t("member.lblBuildingName")}}</label>
                    <input class="form-control required" :placeholder="$t('member.lblBuildingName')" 
                    name="city" :nameControl='$t("member.lblBuildingName")' v-model="form.buildingName"/>
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <div class="col-span-12">
                    <label class="title-input">{{$t("member.lblPhoneNumber")}}</label>
                    <input class="form-control required" :placeholder="$t('member.lblPhoneNumber')" 
                    name="city" :nameControl='$t("member.lblPhoneNumber")' v-model="form.phoneNumber"/>
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <div class="col-span-12">
                    <label class="title-input">{{$t("member.lblBirthday")}}</label>
                    <input class="form-control required" :placeholder="$t('member.lblBirthday')" 
                    name="city" :nameControl='$t("member.lblBirthday")' v-model="form.birthday"/>
                </div>
            </div>
            <div class="group-button">
                <button @click="submitForm">{{$t('groupButton.btnConfirmation')}}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PATH } from '../../constants/PATH'
export default {
    data() {
        return {
            form: {},
            lstCity: ['', 'City1'],
            PATH: PATH
        }
    },
    methods: {
        submitForm() {
            localStorage.setItem('member_info', JSON.stringify({
                surname: this.form.surname,
                name: this.form.name,
                zipcode: this.form.zipcode,
                city: this.form.city,
                addressDetail: this.form.addressDetail,
                addressHouse: this.form.addressHouse,
                buildingName: this.form.buildingName,
                phoneNumber: this.form.phoneNumber,
                birthday: this.form.birthday
            }))
            this.$router.push(PATH.membershipConfirm.url)
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Member.scss';
</style>