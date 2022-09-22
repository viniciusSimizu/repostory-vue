import { defineStore } from 'pinia'
import type { UserStoreModel } from '@/stores/model/user-store.model'
import { useAccessTokenStore } from '@/stores/access-token.store'

export const useUserDatasStore = defineStore('userDatas', {
    state() {
        return {
            user: {
                name: '',
                email: '',
            },
        } as { user: UserStoreModel }
    },
    getters: {
        getUser: (data): UserStoreModel => data.user,
    },
    actions: {
        async setUser() {
            await useAccessTokenStore()
                .apiAxios()
                .get('user/info')
                .then(({ data }) => (this.user = data))
        },
        update(userData: UserStoreModel) {
            this.user = {
                ...this.user,
                ...userData,
            }
        },
    },
})
