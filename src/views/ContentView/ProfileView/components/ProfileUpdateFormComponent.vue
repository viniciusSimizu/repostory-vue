<script>
import { UpdateUserModel } from '@/views/ContentView/ProfileView/model/update-user.model'
import { validateOrReject } from 'class-validator'
import { useAccessTokenStore } from '@/stores/access-token.store'
import { useUserDatasStore } from '@/stores/user-datas.store'

export default {
    data() {
        return {
            userData: new UpdateUserModel(),
            confirmPassword: '',

            user: useUserDatasStore().getUser,
            userStore: useUserDatasStore(),
            accessToken: useAccessTokenStore(),
        }
    },
    methods: {
        async updateUser(e) {
            e.preventDefault()

            try {
                await validateOrReject(this.userData)
                if (this.userData.password === this.confirmPassword) {
                    await this.accessToken
                        .apiAxios()
                        .put('user/update', this.userData)
                        .then(() => {
                            this.userStore.setUser()
                            this.$router.push({ name: 'profile-route' })
                        })
                }
            } catch (err) {
                console.log(err)
            }
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
