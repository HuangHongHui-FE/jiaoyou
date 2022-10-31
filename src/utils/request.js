import axios from 'axios';
const BASE_URL = '127'

const instance = axios.create({
    baseURL: BASE_URL
})



export default {
    get: instance.get,
    post: instance.post
}