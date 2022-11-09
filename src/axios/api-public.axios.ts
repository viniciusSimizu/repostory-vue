import axios from 'axios'
import * as process from 'process'

export const apiPublicAxios = axios.create({
    baseURL: process.env.VITE_BASEURL_API,
})
