import { createRouter, createWebHistory } from "vue-router";
const routes = [{
        path: '/',
        component: () => { return import ('./layouts/Master.vue') },
        name: 'master',
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () => { return import ('./components/pages/Dashboard.vue') }
        }]
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => { return import ('./components/NotFound.vue') },
        name: 'notfound'
    }, {
        path: '/login',
        component: () => { return import ('./components/Login.vue') },
        name: 'login'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});



export default router;