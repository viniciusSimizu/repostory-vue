import { defineStore } from 'pinia'
import axios, { Axios } from 'axios'
import { apiPublicAxios } from '@/axios/api-public.axios'
import router from '@/router'
import * as process from 'process'

export const useAccessTokenStore = defineStore('accessToken', {
    state: () => ({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
    }),
    getters: {
        getAccessToken: (token) => token.accessToken,
    },
    actions: {
        update(tokens: { accessToken: string; refreshToken: string }) {
            localStorage.setItem('accessToken', tokens.accessToken)
            localStorage.setItem('refreshToken', tokens.refreshToken)
            this.accessToken = tokens.accessToken
            this.refreshToken = tokens.refreshToken
        },
        async refresh(): Promise<void> {
            await apiPublicAxios
                .get('user/refresh-token', {
                    headers: { Authorization: `Bearer ${this.refreshToken}` },
                })
                .then(({ data }) => {
                    this.update(data.tokens)
                })
                .catch(() => {
                    const route = router.currentRoute.value
                    if (route.name !== 'gallery-route' && route.path !== '/') {
                        router.push({ name: 'gallery-route' })
                    }
                })
        },
        remove() {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            this.accessToken = null
            this.refreshToken = null
        },
        apiAxios(): Axios {
            const requestAxios = axios.create({
                baseURL: process.env.BASEURL_API,
                headers: { Authorization: `Bearer ${this.getAccessToken}` },
                timeout: 3500,
            })

            requestAxios.interceptors.response.use(undefined, async (error) => {
                try {
                    if (
                        error.response.data.mensage === 'JWT Invalid' &&
                        error.response.status === 401
                    ) {
                        const request = await this.refresh().then(() => {
                            return axios({
                                ...error.config,
                                headers: {
                                    Authorization: `Bearer ${this.accessToken}`,
                                },
                            })
                        })

                        return Promise.resolve(request)
                    }
                } catch (err) {
                    return Promise.reject(error)
                }
            })

            return requestAxios
        },
    },
})
