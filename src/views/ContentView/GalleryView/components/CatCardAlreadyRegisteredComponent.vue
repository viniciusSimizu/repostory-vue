<template>
    <div
        class="d-flex gap-1 w-100 py-3 flex-column align-items-center justify-content-center cat-card"
    >
        <font-awesome-icon
            icon="fa-solid fa-shield-cat"
            class="text-info cat-icon"
        />
        <span class="text-info cat-text">Registered</span>
    </div>
</template>

<style scoped lang="scss">
.cat-card {
    background-color: rgba(29, 29, 29, 0.7);
    clip-path: circle(50%);

    .cat-icon {
        font-size: 3rem;
    }

    .cat-text {
        letter-spacing: 1px;
        font-weight: 300;

        transition: 100ms;

        &:hover {
            font-weight: 400;
        }
    }
}
</style>
