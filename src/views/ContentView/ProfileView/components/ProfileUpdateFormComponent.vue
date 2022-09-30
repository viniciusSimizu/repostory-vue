<script>
import { UpdateUserModel } from '@/views/ContentView/ProfileView/model/update-user.model'
import { validateOrReject } from 'class-validator'
import { useAccessTokenStore } from '@/stores/access-token.store'
import { useUserDatasStore } from '@/stores/user-datas.store'
import { useModalAlert } from '@/stores/modal-alert.store'

export default {
    data() {
        return {
            userData: new UpdateUserModel(),
            confirmPassword: '',

            user: useUserDatasStore().getUser,
            userStore: useUserDatasStore(),
            modalStore: useModalAlert(),
            accessToken: useAccessTokenStore(),
        }
    },
    methods: {
        async updateUser(e) {
            e.preventDefault()

            await validateOrReject(this.userData)
                .then(async () => {
                    if (
                        this.userData.password == this.confirmPassword ||
                        this.userData.password === undefined
                    ) {
                        await this.accessToken
                            .apiAxios()
                            .put('user/update', this.userData)
                            .then(() => {
                                this.userStore.setUser()
                                this.$router.push({ name: 'profile-route' })
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
        updateData() {
            this.userData.name = this.user.name
            this.userData.email = this.user.email
        },
    },
    mounted() {
        this.updateData()
        this.userStore.$subscribe(() => {
            this.user = this.userStore.getUser
            this.updateData()
        })
    },
}
</script>

<template>
    <form
        @submit="updateUser"
        class="d-flex flex-column justify-content-between gap-5 w-100"
    >
        <div class="d-flex flex-column gap-4">
            <input
                class="authentication-input"
                placeholder="Username"
                v-model="userData.name"
            />
            <input
                class="authentication-input"
                placeholder="Email"
                v-model="userData.email"
            />
        </div>
        <div class="d-flex flex-column gap-4">
            <input
                class="authentication-input"
                placeholder="Password"
                type="password"
                v-model="userData.password"
            />
            <input
                class="authentication-input"
                placeholder="Confirm Password"
                type="password"
                v-model="confirmPassword"
            />
            <div class="d-flex justify-content-end">
                <button class="btn btn-outline-success w-75" type="submit">
                    Save changes
                </button>
            </div>
        </div>
    </form>
</template>

<style scoped lang="scss"></style>
