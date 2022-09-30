<script>
import { ModalAlertModel } from '@/components/models/modal-alert.model'

export default {
    props: {
        successAlert: ModalAlertModel,
        showState: Boolean,
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
            v-if="showState && successAlert.type === 'success'"
            class="success-component d-flex align-items-center justify-content-center text-light"
            @click="handleClick"
        >
            <div
                class="success-div d-flex flex-column border border-3 border-success align-items-center px-3 py-5 w-25 h-75"
                @mouseleave="canExit = true"
                @mouseenter="canExit = false"
            >
                <h1
                    class="success-title d-flex justify-content-between text-success"
                >
                    {{ successAlert.title }}
                </h1>
                <font-awesome-icon
                    icon="fa-solid fa-handshake"
                    class="success-icon h-25 w-50 text-success"
                />
                <p
                    class="success-message text-light h-100 mt-5 p-2 border border-3 border-success"
                >
                    {{ successAlert.message }}
                </p>
            </div>
        </div>
    </teleport>
</template>

<style scoped lang="scss">
.success-component {
    height: 100vh;
    width: 100vw;

    background-color: rgba(0, 0, 0, 0.8);

    position: fixed;
    top: 0;
    left: 0;

    z-index: 999;

    opacity: 1;
    transition: opacity 1s;
}

.success-div {
    border-radius: 10px;
}

.success-title {
    color: #f9f9f9;

    font-size: 2rem;
    font-family: Major Mono Display;
    font-weight: 600;
}

.success-icon {
    color: #f2f0f0;
}

.success-message {
    width: 90%;
    color: #fff;

    letter-spacing: -1px;

    font-size: 1.7rem;
    font-family: Major Mono Display;
    font-weight: 200;

    border-radius: 10px;

    grid-row-start: 2;
}
</style>
