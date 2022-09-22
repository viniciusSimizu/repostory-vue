<script>
import { CreateUserModel } from '@/views/JoinView/SignupView/model/create-user.model'
import { validateOrReject } from 'class-validator'
import { apiPublicAxios } from '@/axios/api-public.axios'
import { useAccessTokenStore } from '@/stores/access-token.store'
import { useUserPermissionsStore } from '@/stores/user-permissions.store'

export default {
    name: 'signup-view',
    data() {
        return {
            accessToken: useAccessTokenStore(),
            permissions: useUserPermissionsStore(),
            createUserModel: new CreateUserModel(),
            confirmPassword: '',
        }
    },
    methods: {
        async handleSignUp(e) {
            e.preventDefault()
            try {
                await validateOrReject(this.createUserModel)
                if (this.createUserModel.password === this.confirmPassword) {
                    await apiPublicAxios
                        .post('user/signup', this.createUserModel)
                        .then(({ data }) => {
                            this.accessToken.update(data.tokens)
                            this.permissions.updateIsAuthenticatedUser(true)
                            this.permissions.updateIsGithubUser(false)
                            this.$router.push({ name: 'homepage-route' })
                        })
                } else {
                    alert('Incorrect password')
                }
            } catch (err) {
                alert('Error on signup')
            }
        },
    },
}
</script>

<template>
    <div
        id="signup-view"
        class="w-100 h-100 d-flex flex-column justify-content-center align-items-center"
    >
        <div class="d-flex justify-content-start w-100 px-5">
            <router-link
                id="goBack"
                class="d-flex align-items-center gap-2 p-2 redirection text-light"
                :to="{
                    name:
                        this.$router.currentRoute.value.query.redirect ??
                        'homepage-route',
                }"
            >
                <font-awesome-icon
                    icon="fa-solid fa-arrow-alt-circle-left"
                    class="text-light"
                />
                Voltar
            </router-link>
        </div>
        <div
            class="d-flex align-items-center justify-content-center h-100 w-100"
        >
            <div class="d-flex h-75 flex-column align-items-center w-25 gap-5">
                <h1 id="signup-title">Join Us</h1>
                <form
                    @submit="handleSignUp"
                    class="d-flex flex-column gap-4 w-100"
                >
                    <input
                        class="authentication-input"
                        placeholder="Username"
                        v-model="createUserModel.name"
                    />
                    <input
                        class="authentication-input"
                        placeholder="Email"
                        v-model="createUserModel.email"
                    />
                    <input
                        class="authentication-input"
                        placeholder="Password"
                        type="password"
                        v-model="createUserModel.password"
                    />
                    <input
                        class="authentication-input"
                        placeholder="Confirm Password"
                        type="password"
                        v-model="confirmPassword"
                    />
                    <div class="d-flex justify-content-center">
                        <button
                            id="signup-submit"
                            class="btn btn-md btn-outline-success w-50"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#signup-view {
    margin-top: -3rem;

    font-size: 1.8rem;
}

#signup-title {
    font-size: 3rem;
}

#signup-submit:active {
    transition: 0.2s;
    opacity: 65% !important;
}

#goBack {
    height: 4rem;
}
</style>
