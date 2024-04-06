import api from '@/axios/api'
class Grade {
    async index() {
        return await api.get(`api/Grade/GetAll`);
    }
    async create(formData) {
        return await api.post(`api/Grade/Add`, formData);
    }
}

export default new Grade