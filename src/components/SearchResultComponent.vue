<script>
import { SearchResultModel } from '@/views/ContentView/model/search-result.model'

export default {
    props: {
        data: SearchResultModel,
    },
    methods: {
        findUser() {
            this.$emit('clicked')
            this.$router.push({
                name: 'users-profile-route',
                params: { slug: this.data.slug },
            })
        },
    },
    computed: {
        getUserImage() {
            return this.data.avatarUrl ?? '/src/assets/octocat.png'
        },
    },
}
</script>

<template>
    <div class="d-flex flex-column result" @click="findUser">
        <div class="result-template">
            <img :src="getUserImage" class="rounded-circle" />
            <div class="d-flex flex-column">
                <div class="result-name">{{ data.name }}</div>
                <div class="result-gitname">{{ data.username }}</div>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <span class="result-repositories" v-if="data.repositories"
                >{{ data.repositories }} repos</span
            >
        </div>
    </div>
</template>

<style scoped lang="scss">
.result {
    padding: 1rem 1rem;

    transition: 0.1s;

    .result-template {
        display: grid;
        grid-template-columns: 3rem 1fr;
        grid-gap: 10px;

        img {
            width: 100%;
        }

        .result-name {
            font-size: 1.2rem;
            font-weight: 500;
        }

        .result-gitname {
            color: #cccccc;

            font-size: 0.8rem;
            font-weight: 400;
        }
    }

    .result-repositories {
        font-weight: 300;
    }

    &:hover {
        opacity: 80%;

        cursor: pointer;
    }
}
</style>
