import axios from 'axios'

export const apiPublicAxios = axios.create({
    baseURL: 'http://localhost:3000/',
})
