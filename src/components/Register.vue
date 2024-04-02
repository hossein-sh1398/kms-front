<template>
    <section id="sign">
        <div class="container">
            <div class="d-flex justify-content-center align-items-center">
                <div class="sign__wrapper">
                    <div class="sign__header d-flex flex-column justify-content-between border-0 p-3">
                        <div class="align-self-end">
                            <span class="sign__header--sign-up">عضویت</span>
                            <span class="sign__header--slash mx-1">/</span>
                            <span class="sign__header--sign-in sign__header--active">ورود</span>
                        </div>
                        <img src="../assets/images/logo-white.svg" alt="" class="sign__header--logo" width= "169px" height="43px">
                    </div>
                    <div class="sign__up">
                        <div class="d-flex mb-3">
                            <div class="form__control">
                                <label for="fname" class="form__control-label">نام*</label>
                                <input type="text" v-model.lazy="name" class="form__control-input" placeholder="لطفا نام خود را وارد کنید">
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="form__control">
                                <label for="lname" class="form__control-label">نام خانوادگی*</label>
                                <input type="text" v-model.lazy="registerData.family" class="form__control-input" placeholder="لطفا نام خانوادگی خود را وارد کنید">
                            </div>
                        </div>
                    </div>
                    <div class="sign__in mb-3">
                        <div class="d-flex flex-column mb-2">
                            <div class="d-flex">
                                <div class="form__control">
                                    <label for="telephone" class="form__control-label">شماره موبایل*</label>
                                    <input type="tel" v-model.lazy="registerData.mobile" autocomplete="off" class="form__control-input" placeholder="۰۹xxxxxxxxx مثال">
                                    
                                </div>
                                <button :disabled="showTimer" type="button" @click="getToken" class="sign__in--confirm-number">
                                    <div v-if="tokenLoading" class="spinner-border  spinner-border-sm"></div>
                                    <span v-else>تایید</span>
                                </button>
                            </div>
                        </div>
                        <div class="d-flex flex-column">
                            <div class="form__control">
                                <label for="password" class="form__control-label form__control-password">کد تایید شماره موبایل*</label>
                                <input type="password" v-model.lazy="registerData.token" class="form__control-input" autocomplete="off" placeholder="xxxxxx">
                            </div>
                            <p v-show="showTimer" class="sign--waitingtime ps-2"></p>
                            <p v-show="resendCode" class="sign--waitingtime ps-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span>زمان استفاده از کد به پایان رسید  </span>
                                    <button @click.prevent="getToken()" class="resend-otp-code">ارسال مجدد کد تایید</button>
                                </div>
                            </p>
                        </div>
                        <div class="d-flex flex-column">
                            <div class="form__control">
                                <label class="form__control-label" style="position:relative;top:0;right:0;">منو به خاطر بسپار</label>
                                <input type="checkbox" v-model="registerData.remember_me">
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center position-relative">
                        <button type="submit" @click.prevent="doLogin($event)" class="sign-btn sign-in--btn sign-btn--active">
                            <div class="spinner-border spinner-border-sm" v-if="signInLoading"></div>
                            <span v-else>ورود</span>
                        </button>
                        <button type="submit" :disabled="registerLoading" @click.prevent="doRegister($event)" class="sign-btn sign-up--btn sign-btn--deactive">
                            <div class=" spinner-border spinner-border-sm" v-if="registerLoading"></div>
                            <span v-else>عضویت</span>
                        </button>
                    </div>
                    <div v-if="Object.keys(errors).length > 0">
                        <ul class="mt-5 alert alert-danger">
                            <li style="font-size: 11px;" v-if="Object.hasOwn(errors, 'name')" class="text-danger">{{ errors.name.shift() }}</li>
                            <li style="font-size: 11px;" v-if="Object.hasOwn(errors, 'family')" class="text-danger">{{ errors.family.shift() }}</li>
                            <li style="font-size: 11px;" class="text-danger" v-if="Object.hasOwn(errors, 'mobile')">{{ errors.mobile.shift() }}</li>
                            <li style="font-size: 11px;" class="text-danger" v-if="Object.hasOwn(errors, 'token')">{{ errors.token.shift() }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import {reactive, ref, computed } from 'vue'
import authApi from '@/axios/api-auth'
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useUserStore } from '../store/user'
import { useHead } from '@vueuse/head'
useHead({
    // Can be static or computed
    title: computed(() => 'صفحه ورود و عضویت'),
})
const userStore = useUserStore()
const router = useRouter()
const toast = useToast();
let signInLoading = ref(false)
let registerLoading = ref(false)
let tokenLoading = ref(false)
let showTimer = ref(false)
let resendCode = ref(false)
let name = ref('')
let registerData = reactive({
    name: '',
    family: '',
    mobile: '',
    token: '',
    remember_me:true
})
let errors = {}

async function doLogin(e) {
    if ($(e.currentTarget).hasClass("sign-btn--deactive")) {
        $(".sign__header--sign-in").addClass("sign__header--active");
        $(".sign__header--sign-up").removeClass("sign__header--active");
        $(".sign__up").removeClass("sign__up--active");
        $(".sign-in--btn").removeClass("sign-btn--deactive");
        $(".sign-in--btn").addClass("sign-btn--active");
        $(".sign-up--btn").removeClass("sign-btn--active");
        $(".sign-up--btn").addClass("sign-btn--deactive");
    }
    signInLoading.value = true;
    errors = {}
    try {
        const response = await authApi.post(`login/with/token`, {
            mobile: registerData.mobile,
            token:registerData.token
        });

        signInLoading.value = false
        if (response.data.status) {
            toast.success(response.data.message, {
                timeout: 2000
            });
            userStore.setUser(response.data.user);
            userStore.setToken(response.data.token);
            userStore.setExpiresAt(response.data.expires_at);
            router.push({name:'panel_index'})
        } else {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        }
    } catch (err) {
        signInLoading.value = false
        if (err.response.status == 422) {
            errors = err.response.data.errors
        } else {
            toast.error(err.response.data.message, {
                timeout: 2000
            });
        }
    }
}
async function doRegister(e) {
   if ($(e.currentTarget).hasClass("sign-btn--deactive")) {
        $(".sign__header--sign-in").removeClass("sign__header--active");
        $(".sign__header--sign-up").addClass("sign__header--active");
        $(".sign__up").addClass("sign__up--active");
        $(".sign-in--btn").removeClass("sign-btn--active");
        $(".sign-in--btn").addClass("sign-btn--deactive");
        $(".sign-up--btn").removeClass("sign-btn--deactive");
        $(".sign-up--btn").addClass("sign-btn--active");
    }
    registerLoading.value = true;
    errors = {}
    try {
        const response = await authApi.post(`register`, {
            mobile: registerData.mobile,
            token: registerData.token,
            name: registerData.name,
            family: registerData.family,
        });

        registerLoading.value = false
        if (response.data.status) {
            toast.success(response.data.message, {
                timeout: 2000
            });
            userStore.setUser(response.data.user);
            userStore.setToken(response.data.token);
            router.push({ name: 'panel_index' })
        } else {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        }
    } catch (err) {
        registerLoading.value = false
        if (err.response.status == 422) {
            errors = err.response.data.errors
        } else {
            toast.error(err.response.data.message, {
                timeout: 2000
            });
        }
    }
}
</script>