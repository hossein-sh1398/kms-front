import { defineStore } from "pinia";


export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: JSON.parse(localStorage.getItem('user')) || {
                name: '',
                family: '',
                mobile: '',
            },
            token: localStorage.getItem('token') || '',
            expires_at: localStorage.getItem('expires_at') || '',
            q: ''
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getToken(state) {
            return state.token
        },
        getExpiresAt(state) {
            return state.expires_at
        },
        getQ(state) {
            return state.q
        },
        isAuth(state) {
            let token = state.token;
            let expiresAt = state.expires_at;
            let currentDate = Math.floor(Date.now() / 1000);
            return token && expiresAt && expiresAt > currentDate;
        },
    },
    actions: {
        setUser(user) {
            this.user = user
            localStorage.setItem('user', JSON.stringify(user));

        },
        setToken(token) {
            this.token = token
            localStorage.setItem('token', token);
        },
        setExpiresAt(expires_at) {
            this.expires_at = expires_at
            localStorage.setItem('expires_at', expires_at);
        },
        setQ(q) {
            this.q = q
        }
    }
})