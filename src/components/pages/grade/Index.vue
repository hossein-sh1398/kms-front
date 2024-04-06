<template>
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <router-link :to="{ name: 'dashboard' }" class="content-title mb-0 my-auto">داشبورد</router-link>
                <span class="text-muted mt-1 tx-13 ms-2 mb-0">/</span>
                <span class="text-muted">لیست پایه تحصیلی</span>
            </div>
        </div>
    </div>
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header pb-0">
                <div class="d-flex justify-content-between">
                    <h4 class="card-title mg-b-0">لیست پایه تحصیلی</h4>
                    <router-link :to="{name:'grades.create'}" class="btn btn-success btn-sm">
                        <i class="ms-2 fa fa-plus"></i>جدید
                    </router-link>
                </div>
            </div>
            <div class="card-body">
                <div class="text-center" v-if="loading">
                    <span class="spinner-border spinner-border-sm"></span>
                </div>
                <div class="table-responsive" v-else>
                    <table class="table table-striped mg-b-0 text-md-nowrap table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>عنوان</th>
                                <th>اولویت نمایش</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(grade, index) in grades" :key="grade.id">
                                <th scope="row">{{ 1 + index }}</th>
                                <td>{{ grade.gradeName }}</td>
                                <td>{{ grade.sortingNumber }}</td>
                                <td>
                                    <a href="#"><i class=" fa fa-trash text-danger"></i></a>
                                    <router-link :to="{name:'grades.edit', params:{id:grade.id}}" class="ms-2"><i
                                            class=" fa fa-pen text-warning"></i></router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Grade from "@/services/Grade"
import { reactive, ref, computed } from 'vue'
import { useToast } from "vue-toastification";
import { useHead } from '@vueuse/head'
useHead({
    title: computed(() => 'لیست پایه تحصیلی'),
})
const toast = useToast();
let loading = ref(false)
let grades = ref([]);
let errors = {}

async function index() {
    loading.value = true;
    errors = {}
    try {
        const response = await Grade.index();
        if (response.data.result == 0) {
            grades.value = response.data.data;
            console.log(grades.value)
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
index()
</script>