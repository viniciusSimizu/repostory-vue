<script>
import { useUserPermissionsStore } from '@/stores/user-permissions.store'
import SearchResultComponent from '@/components/SearchResultComponent.vue'
import { apiPublicAxios } from '@/axios/api-public.axios'

export default {
    components: { SearchResultComponent },
    data() {
        return {
            searching: false,
            mouseIn: false,
            clicked: false,
            searchWord: '',
            permissions: useUserPermissionsStore(),
            results: [],
        }
    },
    methods: {
        autoSearch() {
            apiPublicAxios
                .get(`user/list/${this.searchWord}`)
                .then(({ data }) => {
                    this.results = data
                })
        },
        onFocusIn() {
            this.searching = true
            this.clicked = false
        },
        onFocusOut() {
            if (!this.mouseIn) {
                this.searching = false
            }
        },
        onMouseIn(state) {
            this.mouseIn = !!state
            if (this.clicked) {
                this.searching = false
            }
        },
        onClicked() {
            this.clicked = true
        },
    },
}
</script>

<template>
    <header class="px-5">
        <nav class="d-flex h-100 pb-2">
            <div
                class="d-flex flex-row justify-content-between align-items-center w-50"
            >
                <div
                    class="d-flex gap-5 align-items-center justify-content-between h-100 w-100"
                >
                    <router-link
                        :to="{ name: 'homepage-route' }"
                        id="logo"
                        class="text-light"
                        >Repostory_</router-link
                    >
                    <div
                        class="d-flex flex-column search"
                        @mouseenter="onMouseIn"
                        @mouseleave="onMouseIn(false)"
                    >
                        <div
                            class="h-100 d-flex align-items-center search-input"
                        >
                            <font-awesome-icon
                                id="glass"
                                icon="fa-solid fa-magnifying-glass"
                            />
                            <input
                                id="search-box"
                                class="h-50 border border-light border-2 text-light"
                                placeholder="search box"
                                v-model="searchWord"
                                @input="autoSearch"
                                autocomplete="off"
                                @focusin="onFocusIn"
                                @focusout="onFocusOut"
                            />
                        </div>
                        <ul v-if="searching" class="search-results py-0">
                            <li
                                v-for="(profile, i) in results"
                                :key="profile.name"
                            >
                                <div class="px-2 d-flex justify-content-center">
                                    <hr v-if="i !== 0" class="m-0" />
                                    <p v-else class="mt-3"></p>
                                </div>
                                <SearchResultComponent
                                    :data="profile"
                                    @clicked="onClicked"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="w-50">
                <div
                    v-if="permissions.getIsAuthenticatedUser"
                    class="display-button"
                >
                    <router-link
                        v-if="permissions.getIsAuthenticatedUser"
                        class="button-link"
                        :to="{ name: 'gallery-route' }"
                        >Gallery</router-link
                    >
                    <router-link
                        v-if="permissions.getIsGithubUser"
                        class="button-link"
                        :to="{
                            name: 'gallery-route',
                            query: { happybirthday: true },
                        }"
                        >Your Repositories</router-link
                    >
                    <router-link
                        class="button-link"
                        :to="{ name: 'profile-route' }"
                        >Profile</router-link
                    >
                </div>
                <div v-else class="display-button">
                    <router-link
                        class="button-link"
                        :to="{ name: 'login-route' }"
                        >Login</router-link
                    >
                    <router-link
                        class="button-link"
                        :to="{
                            name: 'signup-route',
                            query: {
                                redirect: this.$router.currentRoute.value.name,
                            },
                        }"
                        >Register</router-link
                    >
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss">
header {
    height: 5rem;

    padding-bottom: 0.6rem;

    background-color: #1b2938;
}

.display-button {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: end;
    gap: 5rem;
}

.search {
    width: 15rem;
    height: 5rem;

    .search-results {
        width: inherit;

        background-color: #395365;

        border-radius: 7px;

        position: absolute;
        top: 2rem;

        overflow: hidden;
        z-index: 2;
    }

    .search-input {
        width: inherit;
        z-index: 3;

        #search-box {
            width: inherit;
            padding-left: 2.4rem;

            background-color: #395365;
            border-color: #38586f;
            border-radius: 2rem;

            &:focus {
                outline: none;
            }
        }
    }
}

.button-link {
    color: white;

    font-size: 1.5rem;
    text-decoration: none;

    transition: 0.3s;

    &:hover {
        padding-top: 0.6rem;

        color: aliceblue;
        opacity: 90%;
    }

    &:active {
        font-size: 1.55rem;

        transition: 100ms;

        opacity: 75%;
    }
}

#logo {
    font-size: 30px;
    font-weight: 400;

    text-decoration: none;
}

#glass {
    position: absolute;
    margin-left: 1rem;
}
</style>
