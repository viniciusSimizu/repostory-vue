<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useAccessTokenStore } from '@/stores/access-token.store'

export default {
    name: 'content-view',
    components: { NavbarComponent },
    data() {
        return {
            accessToken: useAccessTokenStore(),
        }
    },
}
</script>

<template>
    <div class="w-100 content">
        <NavbarComponent />
        <main class="h-100 py-5">
            <router-view></router-view>
        </main>
    </div>
</template>

<style scoped lang="scss">
.content {
    display: grid;
    grid-template-rows: 5rem 1fr;
}
</style>
