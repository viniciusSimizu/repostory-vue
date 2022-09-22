import axios from 'axios'

export const githubAxios = axios.create({
    baseURL: 'https://github.com/login/oauth/',
})
