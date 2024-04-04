import api from '@/axios/api'
class Auth {
    async login(formData) {
        return await api.post(`api/Account/Login`, {
            userName: formData.userName,
            password: formData.password,
        });
    }
    async register(formData) {
        return await api.post(`api/Account/RequestRegister`, formData);
    }
}

export default new Auth