import axios from 'axios';
const BASE_URL = '127'
import RootStore from '../mobx/index'


const instance = axios.create({
    baseURL: BASE_URL
})

export default {
    get: instance.get,
    post: instance.post,

    // 加上token
    privatePost: (url, data = {}, options = {}) => {
        const token = RootStore.token;
        const headers = options.headers || {};
        return instance.post(url, data, {
            ...options,
            headers: {
                "Authorization": `Bearer ${token}`,
                ...headers
            }
        })
    }
}