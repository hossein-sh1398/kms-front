<template>
    <div class="row no-gutter">
        <!-- The image half -->
        <div class="col-md-6 col-lg-6 col-xl-7 d-none d-md-flex bg-primary-transparent">
            <div class="row wd-100p mr-center text-center">
                <div class="col-md-12 col-lg-12 col-xl-12 my-auto mr-center wd-100p">
                    <img src="assets/img/media/login.png" class="my-auto ht-xl-80p wd-md-100p wd-xl-80p mr-center"
                        alt="logo">
                </div>
            </div>
        </div>
        <!-- The content half -->
        <div class="col-md-6 col-lg-6 col-xl-5 bg-white">
            <div class="login d-flex align-items-center py-2">
                <!-- Demo content-->
                <div class="container p-0">
                    <div class="row">
                        <div class="col-md-10 col-lg-10 col-xl-9 mr-center">
                            <div class="card-sigin">
                                <div class="card-sigin">
                                    <div class="card-sigin d-flex mb-5">
                                        <a href="index.html"><img src="assets/img/brand/favicon.png"
                                                class="sign-favicon-a ht-40" alt="logo">
                                            <img src="assets/img/brand/favicon-white.png" class="sign-favicon-b ht-40"
                                                alt="logo">
                                        </a>
                                        <h1 class="main-logo1 ms-1 me-0 my-auto tx-28 ps-1">Va<span>le</span>x</h1>
                                    </div>
                                    <div class="card-sigin">
                                        <div class="main-signup-header">
                                            <h2>خوش برگشتی!</h2>
                                            <h5 class="fw-semibold mb-4">لطفا برای ادامه وارد شوید.</h5>
                                            <form action="#">
                                                <div class="form-group">
                                                    <label>پست الکترونیک</label>
                                                    <input class="form-control" v-model.lazy="formData.userName"
                                                        placeholder="نام کاربری خود را وارد کنید" type="text">
                                                    <div style="font-size: 11px;"
                                                        v-if="Object.hasOwn(errors, 'userName')" class="text-danger">{{
                                                        errors.userName.shift() }}</div>
                                                </div>
                                                <div class="form-group">
                                                    <label>کلمه عبور</label>
                                                    <input class="form-control" v-model.lazy="formData.password"
                                                        placeholder="رمز عبور خود را وارد کنید" type="password">
                                                    <div style="font-size: 11px;"
                                                        v-if="Object.hasOwn(errors, 'password')" class="text-danger">{{
                                                        errors.password.shift() }}</div>
                                                </div>
                                                <button type="button" @click="doLogin($event)"
                                                    class="btn btn-main-primary btn-block"
                                                    href="index.html">ورود</button>
                                            </form>
                                            <div class="main-signin-footer mt-5">
                                                <p><a href="forgot.html">رمز عبور را فراموش کرده اید؟</a></p>
                                                <p>حساب کاربری ندارید؟<a href="signup.html"> ایجاد یک حساب کاربری </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- End -->
                </div>
            </div><!-- End -->
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue'
import Auth from '../services/Auth'
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
// import { useUserStore } from '../store/user'
import { useHead } from '@vueuse/head'
useHead({
    // Can be static or computed
    title: computed(() => 'صفحه ورود'),
})
// const userStore = useUserStore()
// const router = useRouter()
// const toast = useToast();
let formData = reactive({
    userName: '',
    password: '',
})
let errors = {}

async function doLogin(e) {

    // signInLoading.value = true;
    errors = {}
    try {
        const response = await Auth.login(formData);
        console.log(response)
        // signInLoading.value = false
        if (response.data.result == 0 ) {
            toast.success(response.data.message, {
                timeout: 2000
            });
            // userStore.setUser(response.data.user);
            // userStore.setToken(response.data.token);
            // userStore.setExpiresAt(response.data.expires_at);
            // router.push({ name: 'panel_index' })
        } else if (response.data.result == 5) {
            toast.warning(response.data.message, {
                timeout: 20000
            });
        } else  {
            toast.warning(response.data.message, {
                timeout: 20000
            });
        }
    } catch (err) {
        // signInLoading.value = false
        if (err.response.status == 422) {
            errors = err.response.data.errors
        } else {
            toast.error(err.response.data.message, {
                timeout: 2000
            });
        }
    }
}
</script>../services/Auth