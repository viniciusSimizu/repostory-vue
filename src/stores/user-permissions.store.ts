import { defineStore } from 'pinia'

export const useUserPermissionsStore = defineStore('userPermissions', {
    state: () => ({
        isAuthenticatedUser: false,
        isGithubUser: false,
    }),
    getters: {
        getIsAuthenticatedUser: (permissions) =>
            permissions.isAuthenticatedUser,
        getIsGithubUser: (permissions) => permissions.isGithubUser,
    },
    actions: {
        updateIsAuthenticatedUser(permission: boolean) {
            this.isAuthenticatedUser = permission
        },
        updateIsGithubUser(permission: boolean) {
            this.isGithubUser = permission
        },
    },
})
