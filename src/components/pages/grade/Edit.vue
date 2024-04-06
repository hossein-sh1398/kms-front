<template>
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header pb-0">
                <div class="d-flex justify-content-between">
                    <h4 class="card-title mg-b-0">لیست پایه تحصیلی</h4>
                    <i class="mdi mdi-dots-horizontal text-gray"></i>
                </div>
            </div>
            <div class="card-body">
                {{ route.params.id }}
            </div>
        </div>
    </div>
</template>
<script setup>
// import Grade from "@/services/Grade"
import { reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from "vue-toastification";
import { useHead } from '@vueuse/head'
const route = useRoute()
useHead({
    title: computed(() => 'لیست پایه تحصیلی'),
})
const toast = useToast();
let loading = ref(false)
let grade = reactive({
    id: 1,
    title:'title1',
    priority: 1,
});
let errors = {}
console.log(route.params.id)
// async function index() {
//     loading.value = true;
//     errors = {}
//     try {
//         const response = await Grade.index();
//         if (response.data.result == 0) {
//             toast.success(response.data.message, { timeout: 2000 });
//         } else if (response.data.result == 5) {
//             toast.warning(response.data.message, {
//                 timeout: 2000
//             });
//         } else {
//             toast.warning(response.data.message, {
//                 timeout: 2000
//             });
//         }
//     } catch (err) {

//     } finally {
//         loading.value = false
//     }
// }
// index()
</script>