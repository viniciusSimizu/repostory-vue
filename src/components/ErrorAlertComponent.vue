<script>
import { ErrorAlertModel } from '@/components/models/error-alert.model'

export default {
    props: {
        errorAlert: ErrorAlertModel,
    },
    data() {
        return {
            canExit: true,
        }
    },
    methods: {
        handleClick() {
            if (this.canExit) {
                this.$emit('exit')
            }
        },
    },
}
</script>

<template>
    <teleport to="#modals">
        <div
            v-if="errorAlert.show"
            class="error-component d-flex align-items-center justify-content-center text-light"
            @click="handleClick"
        >
            <div
                class="error-div border border-1 border-light px-5 py-2 w-50 h-25"
                @mouseleave="canExit = true"
                @mouseenter="canExit = false"
            >
                <h1 class="error-title d-flex justify-content-between">
                    {{ errorAlert.title }}
                </h1>
                <p>{{ errorAlert.message }}</p>
                <font-awesome-icon
                    icon="fa-solid fa-ghost"
                    class="error-icon h-75 w-100"
                />
            </div>
        </div>
    </teleport>
</template>

<style scoped lang="scss">
.error-component {
    height: 100vh;
    width: 100vw;

    position: fixed;
    top: 0;
    left: 0;

    background-color: rgba(0, 0, 0, 0.8);

    z-index: 999;
}

.error-div {
    border-radius: 10px;

    display: grid;
    grid-template: repeat(2, 1fr) / 4fr 1fr;
}

.error-title {
    color: #e3286f;

    font-size: 2rem;
    font-family: Major Mono Display;
    font-weight: 600;
}

.error-icon {
    color: #f7f3f8;

    grid-row: 1 / 3;
    align-self: center;
}

p {
    color: #f7f3e8;

    font-size: 1.2rem;
    font-weight: 200;

    grid-row-start: 2;
}
</style>
