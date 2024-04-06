<template>
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <router-link :to="{ name: 'dashboard' }" class="content-title mb-0 my-auto">داشبورد</router-link>
                <span class="text-muted mt-1 tx-13 ms-2 mb-0">/</span>
                <router-link :to="{ name: 'grades.index' }" class="content-title mb-0 my-auto">لیست پایه تحصیلی</router-link>
                <span class="text-muted mt-1 tx-13 ms-2 mb-0">/</span>
                <span class="text-muted">ایجاد</span>
            </div>
        </div>
    </div>
    <div class="col-xl-12">
        <form action="#">
            <div class="card">
                <div class="card-header pb-0">
                    <div class="d-flex justify-content-between">
                        <h4 class="card-title mg-b-0">لیست پایه تحصیلی</h4>
                        <i class="mdi mdi-dots-horizontal text-gray"></i>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>عنوان پایه تحصیلی</label>
                                <input class="form-control" v-model.lazy="formData.gradeName"
                                    placeholder="عنوان پایه تحصیلی را وارد کنید" type="text">
                                <div style="font-size: 11px;" v-if="Object.hasOwn(errors, 'gradeName')"
                                    class="text-danger">{{
                                    errors.gradeName.shift() }}</div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>اولویت نمایش</label>
                                <select class="form-control" v-model.lazy="formData.sortingNumber">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <div style="font-size: 11px;" v-if="Object.hasOwn(errors, 'sortingNumber')"
                                    class="text-danger" :v-text="errors.sortingNumber.shift()"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <div class="text-center" v-if="loading">
                        <span class="spinner-border spinner-border-sm"></span>
                    </div>
                    <button type="button" v-else @click="createGrade($event)" class="btn btn-main-primary">ثبت</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import Grade from "@/services/Grade"
import { useUserStore } from "@/store/user";
let userStore = useUserStore();
import { reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from "vue-toastification";
import { useHead } from '@vueuse/head'
const route = useRoute()
useHead({
    title: computed(() => 'ثبت پایه تحصیلی'),
})
const toast = useToast();
let loading = ref(false)
let formData = reactive({
    gradeName: '',
    sortingNumber:'',
    id: null,
});
let errors = {}
async function createGrade() {
    loading.value = true;
    errors = {}
    try {
        const response = await Grade.create(formData);
        if (response.data.result == 0) {
            toast.success(response.data.message, { timeout: 2000 });
            formData.value = {}
        } else if (response.data.result == 5) {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        } else {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        }
    } catch (err) {

    } finally {
        loading.value = false
    }
}
</script>