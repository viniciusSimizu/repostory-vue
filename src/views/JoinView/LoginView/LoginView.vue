<script>
import { LoginUserModel } from '@/views/JoinView/LoginView/model/login-user.model'
import { apiPublicAxios } from '@/axios/api-public.axios'
import { validateOrReject } from 'class-validator'
import { useAccessTokenStore } from '@/stores/access-token.store'
import { useUserPermissionsStore } from '@/stores/user-permissions.store'
import { useUserDatasStore } from '@/stores/user-datas.store'

export default {
    name: 'login-view',
    data() {
        return {
            loginUserModel: new LoginUserModel(),
            accessToken: useAccessTokenStore(),
            permissions: useUserPermissionsStore(),
            userStore: useUserDatasStore(),
        }
    },
    methods: {
        async handleLoginUser(e) {
            e.preventDefault()

            try {
                await validateOrReject(this.loginUserModel)
                await apiPublicAxios
                    .post('user/signin', this.loginUserModel)
                    .then(async ({ data }) => {
                        this.accessToken.update(data.tokens)
                        this.permissions.updateIsAuthenticatedUser(true)
                        if (data.gitUser) {
                            this.permissions.updateIsGithubUser(true)
                        }
                        await this.userStore.setUser()
                        this.$router.push({ name: 'homepage-route' })
                    })
            } catch (err) {
                alert('Error on login')
            }
        },
    },
}
</script>

<template>
    <div class="d-flex align-items-center justify-content-center w-100">
        <div
            id="signin"
            class="d-flex flex-column align-items-center justify-content-center w-50"
        >
            <div class="row w-100 h-75">
                <div class="col d-flex flex-column justify-content-between">
                    <h1 id="signin-title">Sign In</h1>
                    <router-link
                        :to="{ name: 'homepage-route' }"
                        class="text-light redirection"
                        >Go back</router-link
                    >
                </div>
                <form
                    @submit="handleLoginUser"
                    class="col d-flex justify-content-center d-flex flex-column gap-4"
                >
                    <input
                        class="authentication-input"
                        placeholder="Username"
                        v-model="loginUserModel.username"
                    />
                    <input
                        class="authentication-input"
                        placeholder="Password"
                        type="password"
                        v-model="loginUserModel.password"
                    />
                    <div class="d-flex justify-content-between">
                        <router-link
                            id="signup-route"
                            :to="{
                                name: 'signup-route',
                                query: {
                                    redirect:
                                        this.$router.currentRoute.value.name,
                                },
                            }"
                            >Sign Up</router-link
                        >
                        <button
                            class="btn btn-outline-success btn-md"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#signin {
    height: 100vh;
}

#signin-title {
    font-size: 4rem;
}

#signup-route {
    color: #5d5dd1;

    margin-top: -0.4rem;
    margin-left: 1rem;

    text-decoration: none;
    transition: 0.3s;

    &:hover {
        padding-top: 0.4rem;
        filter: brightness(2);
    }
}
</style>
