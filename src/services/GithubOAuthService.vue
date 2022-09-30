<script>
import { useAccessTokenStore } from '@/stores/access-token.store'
import { useUserPermissionsStore } from '@/stores/user-permissions.store'
import { useModalAlert } from '@/stores/modal-alert.store'

export default {
    data() {
        return {
            code: this.$route.query.code,
            permissions: useUserPermissionsStore(),
            modalStore: useModalAlert(),
            accessStore: useAccessTokenStore(),
        }
    },
    async beforeMount() {
        try {
            if (this.code) {
                await useAccessTokenStore()
                    .apiAxios()
                    .post(`github/signup/${this.code}`)
                    .then(async () => {
                        this.permissions.updateIsGithubUser(true)
                        await this.accessStore.refresh()
                    })
                    .catch((err) => {
                        this.modalStore.openModal({
                            title: 'Server Error',
                            message: err.response.data.message,
                            type: 'error',
                        })
                    })
            } else {
                this.modalStore.openModal({
                    title: 'Code not received',
                    message: 'For some reason, we do not receive Github code',
                    type: 'error',
                })
            }
        } catch (err) {
            this.modalStore.openModal({
                title: 'Github Error',
                message: 'Error when requesting to Github API',
                type: 'error',
            })
        } finally {
            this.$router.push({ name: 'homepage-route' })
        }
    },
}
</script>
