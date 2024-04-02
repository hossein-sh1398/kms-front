import api from '@/axios/api'
class User {
    async login(formData) {
        return await api.post(`api/Account/Login`, {
            userName: formData.userName,
            password: formData.password,
        });
    }
}

export default new User