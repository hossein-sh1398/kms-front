export const isAuth = () => {
    const token = localStorage.getItem('token') || '';
    const expiresAt = localStorage.getItem('expires_at') || '';
    let currentDate = Math.floor(Date.now() / 1000);
    return token && expiresAt && expiresAt > currentDate;
}
import { useCurrentRouteNameStore } from '../store/current-route'
export const setRouteName = (name) => {
    const currentRouteStore = useCurrentRouteNameStore()
    currentRouteStore.setName(name)
}