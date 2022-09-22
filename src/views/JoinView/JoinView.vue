<script>
export default {
    name: 'join-view',
}
</script>

<template>
    <main class="h-100 w-100 d-flex justify-content-center align-items-center">
        <KeepAlive>
            <router-view></router-view>
        </KeepAlive>
    </main>
</template>

<style lang="scss">
.redirection {
    transition: 0.2s;

    &:hover {
        cursor: pointer;

        opacity: 75%;

        &:active {
            opacity: 50%;
        }
    }
}
</style>
