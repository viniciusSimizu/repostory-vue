<script>
import { CreateUserModel } from '@/views/JoinView/SignupView/model/create-user.model'
import { validateOrReject } from 'class-validator'
import { apiPublicAxios } from '@/axios/api-public.axios'
import { useAccessTokenStore } from '@/stores/access-token.store'
import { useUserPermissionsStore } from '@/stores/user-permissions.store'
import { useModalAlert } from '@/stores/modal-alert.store'

export default {
    name: 'signup-view',
    data() {
        return {
            accessToken: useAccessTokenStore(),
            permissions: useUserPermissionsStore(),
            createUserModel: new CreateUserModel(),
            modalStore: useModalAlert(),
            passwordOne: {
                hidden: true,
                type: 'password',
                icon: 'fa-regular fa-eye',
            },
            passwordTwo: {
                hidden: true,
                type: 'password',
                icon: 'fa-regular fa-eye',
            },
            confirmPassword: '',
        }
    },
    methods: {
        async handleSignUp(e) {
            e.preventDefault()
            await validateOrReject(this.createUserModel)
                .then(async () => {
                    if (
                        this.createUserModel.password === this.confirmPassword
                    ) {
                        await apiPublicAxios
                            .post('user/signup', this.createUserModel)
                            .then(({ data }) => {
                                this.accessToken.update(data.tokens)
                                this.permissions.updateIsAuthenticatedUser(true)
                                this.permissions.updateIsGithubUser(false)
                                this.$router.push({ name: 'homepage-route' })
                            })
                            .catch(() => {
                                this.modalStore.openModal({
                                    title: 'Something went wrong',
                                    message: 'Server Error',
                                    type: 'error',
                                })
                            })
                    } else {
                        this.modalStore.openModal({
                            title: 'Incorrect password',
                            message: 'Passwords do not match',
                            type: 'error',
                        })
                    }
                })
                .catch((errors) => {
                    const errorToDisplay = errors[0]
                    switch (errorToDisplay.property) {
                        case 'name':
                            this.modalStore.openModal({
                                title: 'Username invalid',
                                message: Object.values(
                                    errorToDisplay.constraints
                                )[0],
                                type: 'error',
                            })
                            break
                        case 'email':
                            this.modalStore.openModal({
                                title: 'Email invalid',
                                message: 'Must be provided a valid email',
                                type: 'error',
                            })
                            break
                        case 'password':
                            this.modalStore.openModal({
                                title: 'Password invalid',
                                message: Object.values(
                                    errorToDisplay.constraints
                                )[0],
                                type: 'error',
                            })
                    }
                })
        },

        handlePassword(passwordId) {
            switch (passwordId) {
                case 'one':
                    if (this.passwordOne.hidden) {
                        this.passwordOne = {
                            hidden: false,
                            type: 'text',
                            icon: 'fa-regular fa-eye-slash',
                        }
                    } else {
                        this.passwordOne = {
                            hidden: true,
                            type: 'password',
                            icon: 'fa-regular fa-eye',
                        }
                    }
                    break
                case 'two':
                    if (this.passwordTwo.hidden) {
                        this.passwordTwo = {
                            hidden: false,
                            type: 'text',
                            icon: 'fa-regular fa-eye-slash',
                        }
                    } else {
                        this.passwordTwo = {
                            hidden: true,
                            type: 'password',
                            icon: 'fa-regular fa-eye',
                        }
                    }
                    break
                default:
                    break
            }
        },
    },
}
</script>

<template>
    <div
        id="signup-view"
        class="w-100 h-100 d-flex flex-column justify-content-center align-items-center"
        ref="teste"
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
                    <div class="d-flex align-items-center">
                        <input
                            class="authentication-input password-input"
                            placeholder="Password"
                            :type="passwordOne.type"
                            v-model="createUserModel.password"
                        />
                        <font-awesome-icon
                            :icon="passwordOne.icon"
                            class="eye-icon"
                            @click="handlePassword('one')"
                        />
                    </div>
                    <div class="d-flex align-items-center">
                        <input
                            class="authentication-input password-input"
                            placeholder="Confirm Password"
                            :type="passwordTwo.type"
                            v-model="confirmPassword"
                        />
                        <font-awesome-icon
                            :icon="passwordTwo.icon"
                            class="eye-icon"
                            @click="handlePassword('two')"
                        />
                    </div>
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

.password-input {
    padding-right: 3.5rem;
}

.eye-icon {
    margin-left: -3rem;

    z-index: 3;
    cursor: pointer;

    &:hover {
        opacity: 75%;
    }
}
</style>
