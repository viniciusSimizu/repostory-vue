<script>
import { FindUserModel } from '@/views/ContentView/UsersProfile/model/find-user.model'
import { apiPublicAxios } from '@/axios/api-public.axios'

export default {
    props: {
        slug: String,
    },
    data() {
        return {
            user: new FindUserModel(),
            gitUser: false,
        }
    },
    methods: {
        getUser(slug) {
            apiPublicAxios.get(`user/find/${slug}`).then(({ data }) => {
                this.user = data.user
                if (this.user?.githubAccount?.username) {
                    this.gitUser = true
                } else {
                    this.gitUser = false
                }
            })
        },
        openRepositoryLink(url) {
            window.open(url, '_blank')
        },
    },
    beforeMount() {
        this.getUser(this.slug)
    },
    computed: {
        getUserImage() {
            return (
                this.user?.githubAccount?.avatarUrl || '/src/assets/octocat.png'
            )
        },
    },
    watch: {
        '$route.params': async function () {
            this.getUser(this.$route.params.slug)
        },
    },
}
</script>

<template>
    <div class="d-flex flex-column align-items-center gap-4 container">
        <div class="w-25 px-5 d-flex justify-content-center">
            <img :src="getUserImage" class="img-fluid w-75 rounded-circle" />
        </div>
        <div class="d-flex flex-column align-items-center gap-2">
            <div class="display-3 text-light">{{ user.name }}</div>
            <div v-if="gitUser" class="h3" style="color: #ccc">
                {{ user.githubAccount.username }}
            </div>
        </div>
        <div class="w-50">
            <hr class="bg-light" />
        </div>
        <div v-if="gitUser" class="w-100" id="repositories">
            <div
                v-for="repository in user.githubAccount.repositories"
                :key="repository.id"
            >
                <div
                    @click="openRepositoryLink(repository.url)"
                    class="repository d-flex flex-column gap-1 py-1 px-4"
                >
                    <h1 class="mx-auto">{{ repository.repoName }}</h1>
                    <hr />
                    <p class="pt-3">
                        <span v-if="repository.description">{{
                            repository.description
                        }}</span>
                        <span v-else class="text-secondary"
                            >No description:<br />(╯°□°）╯︵ ┻━┻</span
                        >
                    </p>
                </div>
            </div>
        </div>
        <div v-else class="display-6 text-light mt-5">
            <span class="text-danger">Not</span> GitHub User
        </div>
    </div>
</template>

<style scoped lang="scss">
#repositories {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3rem;

    .repository {
        border: 1px solid #ccc;
        border-radius: 5px;

        background-color: #131b2c;

        cursor: pointer;

        transition: 0.2s;

        &:hover {
            font-size: 110%;

            filter: brightness(200%);
        }
    }
}
</style>
