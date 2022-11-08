<script>
import { useAccessTokenStore } from '@/stores/access-token.store'
import { useUserPermissionsStore } from '@/stores/user-permissions.store'
import GithubComponent from '@/components/GithubComponent.vue'
import { useUserDatasStore } from '@/stores/user-datas.store'
import { UserInfoModel } from '@/views/ContentView/HomepageView/model/user-info.model'
import GithubInfoPadComponent from '@/views/ContentView/HomepageView/components/GithubInfoPadComponent.vue'
import { useModalAlert } from '@/stores/modal-alert.store'
import octocatImg from '/src/assets/octocat.png'

export default {
    name: 'homepage-view',
    components: { GithubInfoPadComponent, GithubComponent },
    data() {
        return {
            accessToken: useAccessTokenStore(),
            permissions: useUserPermissionsStore(),
            userStore: useUserDatasStore(),
            modalStore: useModalAlert(),
            user: useUserDatasStore().getUser,
            userInfo: new UserInfoModel(),
        }
    },
    beforeMount() {
        this.userStore.$subscribe(() => (this.user = this.userStore.getUser))
        if (!this.permissions.getIsAuthenticatedUser) {
            this.$router.push({ name: 'gallery-route' })
        }
    },
    mounted() {
        if (this.permissions.getIsGithubUser) {
            this.accessToken
                .apiAxios()
                .get('user/info')
                .then(({ data }) => {
                    this.userInfo = data.githubAccount._count
                })
                .catch(() => {
                    this.modalStore.openModal({
                        title: 'API Error',
                        message: 'Something went wrong on api',
                        type: 'error',
                    })
                })
        }
    },
    computed: {
        isGithubUser() {
            if (this.permissions.getIsGithubUser) {
                return true
            } else {
                return false
            }
        },
        getUserImage() {
            return this.isGithubUser && this.user.githubAccount.avatarUrl
                ? this.user.githubAccount.avatarUrl
                : octocatImg
        },
    },
}
</script>

<template>
    <div id="homepage" class="container h-100">
        <div class="d-flex flex-column align-items-center profile px-4">
            <div class="d-flex flex-column align-items-center gap-4">
                <div class="w-50 image-profile">
                    <img
                        :src="getUserImage"
                        class="rounded-circle img-fluid border border-1 border-secondary"
                    />
                </div>
                <div class="d-flex flex-column gap-2 align-items-center">
                    <h3 class="text-light m-0 homepage-name">
                        {{ this.user.name }}
                    </h3>
                    <h4 v-if="isGithubUser" class="github-username">
                        {{ this.user.githubAccount.username }}
                    </h4>
                </div>
            </div>
            <hr class="w-100 profile-divisor" />
            <GithubComponent v-if="!isGithubUser" class="github-component" />
        </div>
        <GithubInfoPadComponent
            v-bind:is-github-user="this.isGithubUser"
            v-bind:user-info="this.userInfo"
        />
    </div>
</template>

<style scoped lang="scss">
#homepage {
    display: grid;
    grid-template-columns: 22rem 1fr;
}

.profile {
    border-right: 1px solid #38586f;
}

.profile-divisor {
    background-color: #38586f;
    border: 0;
    height: 1px;
}

.image-profile {
    height: 9rem;
}

.github-component {
    height: 3.5rem;
}

.homepage-name {
    font-size: 3rem;
    font-weight: 400;
}

.github-username {
    color: #ccc;

    font-size: 1.8rem;
    font-weight: 300;
}
</style>
