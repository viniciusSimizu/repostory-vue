<script>
import { useUserPermissionsStore } from '@/stores/user-permissions.store'
import GithubComponent from '@/components/GithubComponent.vue'
import ProfileButtonDisplayComponent from '@/views/ContentView/ProfileView/components/ProfileButtonDisplayComponent.vue'
import ProfileUpdateFormComponent from '@/views/ContentView/ProfileView/components/ProfileUpdateFormComponent.vue'
import { useAccessTokenStore } from '@/stores/access-token.store'
import { useUserDatasStore } from '@/stores/user-datas.store'

export default {
    components: {
        ProfileUpdateFormComponent,
        ProfileButtonDisplayComponent,
        GithubComponent,
    },
    data() {
        return {
            permissions: useUserPermissionsStore(),
            accessToken: useAccessTokenStore(),
            userStore: useUserDatasStore(),
            user: useUserDatasStore().getUser,
            updating: false,
        }
    },
    beforeMount() {
        this.userStore.$subscribe(() => (this.user = this.userStore.getUser))
        this.onUpdateRoute()

        if (!this.permissions.getIsAuthenticatedUser) {
            this.$router.push({ name: 'homepage-route' })
        }
    },
    methods: {
        onUpdateRoute() {
            if (this.$route.query.updating) {
                this.updating = true
            } else this.updating = false
        },
        async onDeleteAccount() {
            if (
                prompt(`Digit ${this.user.name} to delete`) === this.user.name
            ) {
                await this.accessToken
                    .apiAxios()
                    .delete('user/delete')
                    .then(() => {
                        this.accessToken.remove()
                        this.permissions.$reset()
                        alert('Deleted')
                        this.$router.push({ name: 'homepage-route' })
                    })
            }
        },
        exit() {
            this.accessToken.remove()
            this.permissions.$reset()
            this.$router.push({ name: 'homepage-route' })
        },
    },
    computed: {
        isGithubUser() {
            return this.permissions.getIsGithubUser
        },
        getUserImage() {
            return this.isGithubUser && this.user.githubAccount.avatarUrl
                ? this.user.githubAccount.avatarUrl
                : '/src/assets/octocat.png'
        },
    },
    watch: {
        '$route.query': function () {
            this.onUpdateRoute()
        },
    },
}
</script>

<template>
    <div class="container profile-template text-light">
        <div
            v-if="updating"
            id="profile-update-form"
            class="d-flex align-items-center"
        >
            <ProfileUpdateFormComponent />
        </div>
        <div v-else class="d-flex flex-column profile-options">
            <div class="d-flex flex-column gap-4">
                <ProfileButtonDisplayComponent
                    v-if="isGithubUser"
                    color="9463D2"
                    title="Added Repositories"
                    theme="white"
                    action="listHappyUserRepositories"
                    @listHappyUserRepositories="
                        this.$router.push({
                            name: 'gallery-route',
                            query: { changing: true },
                        })
                    "
                    >List your repositories
                    displayed</ProfileButtonDisplayComponent
                >
                <ProfileButtonDisplayComponent
                    color="EBDC58"
                    title="Edit Profile"
                    theme="black"
                    action="updateRedirect"
                    @updateRedirect="
                        this.$router.push({
                            name: 'profile-route',
                            query: { updating: true },
                        })
                    "
                    >Change your informations</ProfileButtonDisplayComponent
                >
            </div>
            <div>
                <ProfileButtonDisplayComponent
                    color="DF4E4E"
                    title="Delete Account"
                    theme="white"
                    action="deleteUserAccount"
                    @deleteUserAccount="onDeleteAccount"
                    >Delete account and your datas on
                    site</ProfileButtonDisplayComponent
                >
            </div>
        </div>
        <div class="d-flex flex-column gap-4">
            <div class="profile-image">
                <img :src="getUserImage" class="rounded-circle img-fluid" />
            </div>
            <div class="d-flex flex-column align-items-center">
                <h4 class="profile-name">
                    {{ this.user.name }}
                </h4>
                <h6 v-if="isGithubUser" class="profile-username">
                    {{ this.user.githubAccount.username }}
                </h6>
                <hr class="w-25" />
                <p class="profile-email">{{ this.user.email }}</p>
            </div>
            <div class="d-flex justify-content-center">
                <GithubComponent v-if="!isGithubUser" class="w-50" />
            </div>
            <button class="btn btn-outline-danger w-50 mx-auto" @click="exit">
                Exit
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
#profile-update-form {
    max-width: 35rem;
}

.profile-template {
    display: grid;
    grid-template-columns: 1fr 30rem;

    .profile-image {
        padding: 0 7rem;
    }

    .profile-options {
        gap: 10rem;
    }

    .profile-name {
        font-size: 2.2rem;
        font-weight: 500;
    }

    .profile-username {
        color: #ccc;
        font-size: 1rem;
        font-weight: 400;
    }

    .profile-email {
        font-size: 1rem;
        font-weight: 300;
    }
}
</style>
