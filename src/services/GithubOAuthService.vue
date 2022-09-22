<script>
import { useAccessTokenStore } from '@/stores/access-token.store'
import { useUserPermissionsStore } from '@/stores/user-permissions.store'

export default {
    data() {
        return {
            code: this.$route.query.code,
            permissions: useUserPermissionsStore(),
        }
    },
    async beforeMount() {
        try {
            console.log('uepa', this.code)
            if (this.code) {
                await useAccessTokenStore()
                    .apiAxios()
                    .post(`github/signup/${this.code}`)
                this.permissions.updateIsGithubUser(true)
            }
        } catch (err) {
            alert(err.response.data.message)
        } finally {
            this.$router.push({ name: 'homepage-route' })
        }
    },
}
</script>
