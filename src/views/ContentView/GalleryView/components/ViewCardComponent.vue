<script>
import { CardModel } from '@/views/ContentView/GalleryView/model/card.model'
import { useAccessTokenStore } from '@/stores/access-token.store'
import CatCardAlreadyRegisteredComponent from './CatCardAlreadyRegisteredComponent.vue'
import DeleteUpdateCardComponent from './DeleteUpdateCardComponent.vue'
import SaveRepositoryCardComponent from './SaveRepositoryCardComponent.vue'

export default {
    components: {
        SaveRepositoryCardComponent,
        DeleteUpdateCardComponent,
        CatCardAlreadyRegisteredComponent,
    },
    props: {
        cardData: CardModel,
        canChange: Boolean,
        canAdd: Boolean,
    },
    data: () => ({
        accessToken: useAccessTokenStore(),
    }),
    methods: {
        async createRepository() {
            await this.accessToken
                .apiAxios()
                .post(`repository/create/${this.cardData.repoName}`)
                .then(() => {
                    alert('Criadu')
                    this.$emit('created', this.cardData.apiId)
                })
                .catch(() => console.log('ñ criadu'))
        },

        async deleteRepository() {
            await this.accessToken
                .apiAxios()
                .delete(`repository/delete/${this.cardData.id}`)
                .then(() => {
                    alert('Deleted')
                    this.$emit('destroy', this.cardData.id)
                })
        },

        async openRepositoryLink() {
            window.open(this.cardData.url, '_blank')
        },
    },
    computed: {
        filteringDescription() {
            const description = this.cardData.description
            return description.length > 200
                ? description.substring(0, 200) + '...'
                : description
        },
    },
}
</script>

<template>
    <section class="card-component">
        <div class="d-flex flex-column px-3 py-2">
            <div class="d-flex justify-content-between">
                <span class="repo-name">{{ cardData.repoName }}</span
                ><span @click="openRepositoryLink" class="external-link-icon"
                    ><font-awesome-icon icon="fa-solid fa-external-link"
                /></span>
            </div>
            <div class="owner">{{ cardData.githubAccount.username }}</div>
        </div>
        <div v-if="cardData.description">
            <hr class="my-0 line" />
            <div class="px-3 py-2 description">
                {{ filteringDescription }}
            </div>
        </div>
        <div v-if="canChange || canAdd">
            <hr class="my-0 line" />
            <div class="d-flex justify-content-end gap-3 px-3">
                <SaveRepositoryCardComponent
                    v-if="canAdd && !this.cardData.alreadyAdded"
                    @createRepository="createRepository"
                />
                <CatCardAlreadyRegisteredComponent
                    v-if="this.cardData.alreadyAdded"
                />
                <DeleteUpdateCardComponent
                    v-if="canChange"
                    @deleteRepository="deleteRepository"
                />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.card-component {
    max-height: 17rem;

    border-radius: 5px;
    border: 2px solid #aaa;

    background-color: #333 !important;

    transition: 0.2s;

    &:hover {
        filter: brightness(115%);
    }
}

.card-button {
    width: 5rem;
    height: 2rem;

    padding: 0;

    transition: 0.1s;

    &:active {
        opacity: 75%;
    }
}

.owner {
    color: #ccc;

    font-size: 0.9rem;
    font-weight: 300;
}

.repo-name {
    font-size: 1.5rem;
    font-weight: 500;
}

.description {
    font-size: 1rem;
    font-weight: 400;
}

.external-link-icon {
    font-size: 1.3rem;
    transition: 0.2s;

    cursor: pointer;
    &:hover {
        color: #ccc;
        font-size: 1.47rem;
    }
}

.line {
    border: 0;
    height: 2px;
    background-color: #aaa;
}
</style>
