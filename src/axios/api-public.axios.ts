import axios from 'axios'

export const apiPublicAxios = axios.create({
    baseURL: import.meta.env.VITE_BASEURL_API,
})
