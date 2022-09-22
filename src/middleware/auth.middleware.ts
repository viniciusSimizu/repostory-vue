import { useAccessTokenStore } from '@/stores/access-token.store'
import { useUserPermissionsStore } from '@/stores/user-permissions.store'
import { useUserDatasStore } from '@/stores/user-datas.store'
import router from '@/router'

export async function authMiddleware() {
    const accessToken = useAccessTokenStore()
    const permissions = useUserPermissionsStore()
    const userStore = useUserDatasStore()
    if (accessToken.getAccessToken) {
        await verifyAssignature(accessToken, permissions, userStore)
    }
}

async function verifyAssignature(accessToken, permissions, userStore) {
    await accessToken
        .apiAxios()
        .get('user/verify-signature')
        .then(({ data }) => {
            permissions.updateIsAuthenticatedUser(true)
            if (data.gitUser) {
                permissions.updateIsGithubUser(true)
            }
        })
        .then(async () => {
            await userStore.setUser()
        })
        .catch((err) => {
            console.log(err)
        })
}
