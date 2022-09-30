<script>
import ViewCardComponent from './components/ViewCardComponent.vue'
import { useAccessTokenStore } from '@/stores/access-token.store'
import { useUserPermissionsStore } from '@/stores/user-permissions.store'
import { apiPublicAxios } from '@/axios/api-public.axios'
import { useModalAlert } from '@/stores/modal-alert.store'

export default {
    components: { ViewCardComponent },
    data() {
        return {
            accessToken: useAccessTokenStore(),
            permissions: useUserPermissionsStore(),
            modalStore: useModalAlert(),
            adding: false,
            changing: false,
            repositories: [],
            repositories1: [],
            repositories2: [],
            repositories3: [],
        }
    },
    methods: {
        async getRepositories(gitUser) {
            try {
                this.repositories = []
                if (this.adding && gitUser) {
                    await this.accessToken
                        .apiAxios()
                        .get('github/list')
                        .then(({ data }) => {
                            this.repositories = data
                        })
                } else if (this.changing && gitUser) {
                    await this.accessToken
                        .apiAxios()
                        .get('repository/list/user')
                        .then(({ data }) => {
                            this.repositories = data
                        })
                } else {
                    await apiPublicAxios
                        .get('repository/list')
                        .then(({ data }) => {
                            this.repositories = data
                        })
                }
            } catch {
                this.modalStore.openModal({
                    title: 'Repositories can not be pulled',
                    message: 'Error when trying to pull repositories',
                    type: 'error',
                })
            }
        },
        changeStatus() {
            const queryRoute = this.$route.query
            if (queryRoute.happybirthday && this.permissions.getIsGithubUser) {
                this.adding = true
                this.changing = false
            } else if (
                queryRoute.changing &&
                this.permissions.getIsGithubUser
            ) {
                this.changing = true
                this.adding = false
            } else {
                this.changing = false
                this.adding = false
            }
        },
        dataUpdate() {
            this.changeStatus()
            this.getRepositories(this.permissions.getIsGithubUser)
        },

        onDestroyed(repoId) {
            const newRepositories = this.repositories.filter(
                (repo) => repo.id !== repoId
            )
            this.repositories = newRepositories
        },

        onCreated(repoId) {
            const newRepositories = this.repositories.map((repo) => {
                if (repo.id === repoId || repo.apiId === repoId) {
                    repo.alreadyAdded = true
                    return repo
                }
                return repo
            })
            this.repositories = newRepositories
        },
    },
    async beforeMount() {
        await this.dataUpdate()
    },
    mounted() {
        this.permissions.$subscribe((action) => {
            if (action.events.key === 'isGithubUser') {
                this.dataUpdate()
            }
        })
    },
    watch: {
        '$route.query': function () {
            this.dataUpdate()
        },
        repositories(newRepositories) {
            let column = 1
            this.repositories1 = []
            this.repositories2 = []
            this.repositories3 = []

            for (let i = 0; i < newRepositories.length; i++) {
                const repository = newRepositories[i]
                switch (column) {
                    case 1:
                        this.repositories1.push(repository)
                        column = 2
                        break
                    case 2:
                        this.repositories2.push(repository)
                        column = 3
                        break
                    case 3:
                        this.repositories3.push(repository)
                        column = 1
                        break
                    default:
                        break
                }
            }
        },
    },
}
</script>

<template>
    <div v-if="repositories.length" id="gallery" class="container mt-5">
        <div class="flex-card">
            <div v-for="repository in repositories1" :key="repository.id">
                <ViewCardComponent
                    v-bind:can-change="this.changing"
                    v-bind:can-add="this.adding"
                    :card-data="repository"
                    @destroy="onDestroyed"
                    @created="onCreated"
                />
            </div>
        </div>
        <div class="flex-card">
            <div v-for="repository in repositories2" :key="repository.id">
                <ViewCardComponent
                    v-bind:can-change="this.changing"
                    v-bind:can-add="this.adding"
                    :card-data="repository"
                    @destroy="onDestroyed"
                    @created="onCreated"
                />
            </div>
        </div>
        <div class="flex-card">
            <div v-for="repository in repositories3" :key="repository.id">
                <ViewCardComponent
                    v-bind:can-change="this.changing"
                    v-bind:can-add="this.adding"
                    :card-data="repository"
                    @destroy="onDestroyed"
                    @created="onCreated"
                />
            </div>
        </div>
    </div>
    <div v-else class="p-5 display-6">No repositories found</div>
</template>

<style scoped lang="scss">
#gallery {
    display: grid;
    grid-template: 1fr / repeat(3, 1fr);
    grid-gap: 2rem;
}

.flex-card {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>
