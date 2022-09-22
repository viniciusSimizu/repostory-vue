<script>
import { useAccessTokenStore } from '@/stores/access-token.store'
import { githubAxios } from '@/axios/github.axios'

export default {
    data() {
        return {
            accessToken: useAccessTokenStore(),
        }
    },
    methods: {
        async connectGithub() {
            location.href = `${
                githubAxios.defaults.baseURL
            }authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`
        },
    },
}
</script>

<template>
    <div
        class="github-component d-flex align-items-center gap-3 px-3 py-2 bg-dark"
        @click="connectGithub"
    >
        <font-awesome-icon
            icon="fa-brands fa-github"
            class="text-light h-100"
        />
        <div>Connect Github</div>
    </div>
</template>

<style scoped lang="scss">
.github-component {
    display: grid;
    grid-template-columns: 7rem 1fr;

    height: 3.5rem;

    border: 1px solid black;

    font-size: 1.3rem;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
        font-size: 1.32rem;

        border: 1px solid white;
    }
}
</style>
