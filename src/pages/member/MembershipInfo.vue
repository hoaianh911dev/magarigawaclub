<template>
    <div class="section-main section-member">
        <div class="title_main">
            <h2>{{ $t('member.titleMemberInfor') }}</h2>
        </div>
        <div class="form-input">
            <div class="group-input grid grid-cols-12 gap-16">
                <div class="col-span-12">
                    <label class="title-input">{{$t("member.lblYourName")}}
                        <span class="note">(*)</span>
                    </label>
                    <input class="form-control required" :placeholder="$t('member.lblYourName')" 
                    name="fullname" :nameControl="$t('member.lblYourName')" v-model="form.fullname"/>
                </div>
            </div>
            <div class="group-input grid grid-cols-12 gap-16">
                <div class="col-span-12">
                    <label class="title-input">{{$t("member.lblEmail")}}
                        <span class="note">(*) {{ $t('member.lblEmailNote') }}</span>
                    </label>
                    <input class="form-control required" :placeholder="$t('member.lblEmail')" 
                    name="email" :nameControl="$t('member.lblEmail')" v-model="form.email"/>
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <div class="col-span-12">
                    <label class="title-input">{{$t("member.lblAddress")}}</label>
                    <input class="form-control required" :placeholder="$t('member.lblAddressDetail')" 
                    name="city" :nameControl='$t("member.lblAddressDetail")' v-model="form.addressDetail"/>
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <div class="col-span-12">
                    <label class="title-input">{{$t("member.lblPhoneNumber")}}</label>
                    <input class="form-control required" :placeholder="$t('member.lblPhoneNumber')" 
                    name="phoneNumber" :nameControl='$t("member.lblPhoneNumber")' v-model="form.phoneNumber"
                    maxlength="10"/>
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <div class="col-span-12">
                    <label class="title-input">{{$t("member.lblBirthday")}}
                        <span class="note">(*) {{ $t('member.lblBirthdayNote') }}</span>
                    </label>
                    <el-date-picker
                        type="date"
                        format="DD/MM/YYYY" 
                        v-model="form.birthday"
                        :disabled-date="disabledDate" />
                </div>
            </div>
            <div class="group-input grid grid-cols-12">
                <div class="col-span-12">
                    <label class="title-input">{{$t("member.lblAvatar")}}
                        <span class="note">(*)</span>
                    </label>
                    <div class="drop-image" @click="handleUpload()"
                    @dragover="handleDragOver"
                    @dragleave="handleDragLeave"
                    @drop="handleDrop">
                        <input ref="file" type="file" accept="image/*"
                        @change="fileChange"
                        hidden />
                        <div class="text-32 text-center" v-if="!avatar">
                            <div>+</div>
                            <div class="text-14">{{ $t('member.lblDragImage') }}</div>
                        </div>
                        <img :src="avatar" v-else />
                    </div>
                </div>
            </div>
            <div class="group-button">
                <button @click="handleSubmit">{{$t('groupButton.btnSave')}}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
//layout
import { ElDatePicker } from 'element-plus'
import { PATH } from '../../constants/path'
export default {
    components: {
        ElDatePicker
    },
    data() {
        return {
            form: {},
            isDragging: false,
            avatar: ''
        }
    },
    methods: {
        handleSubmit() {
            // localStorage.setItem('member_info', JSON.stringify({
            //     surname: this.form.surname,
            //     name: this.form.name,
            //     zipcode: this.form.zipcode,
            //     city: this.form.city,
            //     addressDetail: this.form.addressDetail,
            //     addressHouse: this.form.addressHouse,
            //     buildingName: this.form.buildingName,
            //     phoneNumber: this.form.phoneNumber,
            //     birthday: this.form.birthday
            // }))
            this.$router.push(PATH.membershipConfirm.url)
        },
        handleUpload() {
            this.$refs.file.click()
        },
        fileChange(e, isDrop = false) {
            const file = isDrop ? e.dataTransfer.files[0] : e.target.files[0]
            if(file) {
                this.avatar = URL.createObjectURL(file)
            }
        },
        handleDragOver(e) {
            e.preventDefault()
            this.isDragging = true
        },
        handleDragLeave() {
            this.isDragging = false
        },
        handleDrop(e) {
            e.preventDefault()
            this.fileChange(e, true)
            this.isDragging = true
        },
        disabledDate(date) {
            const dayChoose = new Date(date)
            const dayCurrent = new Date()

            const yearChoose = dayChoose.getFullYear()
            const yearCurrent = dayCurrent.getFullYear()
   
            if((yearCurrent - yearChoose) < 15) return true
            return false
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/Member.scss';
</style>../../constants/path