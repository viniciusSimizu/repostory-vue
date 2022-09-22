<script setup></script>
<template>
    <div class="py-2">
        <button
            class="card-button btn btn-outline-success"
            @click="this.$emit('createRepository')"
        >
            Commit
        </button>
    </div>
</template>

<style scoped lang="scss">
.card-button {
    width: 5rem;
    height: 2rem;

    padding: 0;

    transition: 0.1s;

    &:active {
        opacity: 75%;
    }
}
</style>
