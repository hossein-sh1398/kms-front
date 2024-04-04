import api from '@/axios/api'
class User {
    async updateProfile(formData) {
        return await api.post(`api/User/EditUserProfile`, formData);
    }
    async uploadAvatar(formData, userId) {
        return await api.post(`api/User/EditUserProfileImage?Id=${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default new User