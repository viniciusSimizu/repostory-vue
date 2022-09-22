<script>
export default {
    props: {
        title: {
            type: String,
        },
        color: {
            type: String,
        },
        action: {
            type: String,
        },
        theme: {
            type: String,
        },
    },
    methods: {
        onClickEmitAction() {
            this.$emit(this.action)
        },
    },
    computed: {
        cssVar() {
            return {
                '--profile-color': `#${this.color}`,
                '--profile-text-color': this.theme,
            }
        },
        buttonStyle() {
            return {
                border: `1px solid #${this.color}`,
            }
        },
    },
}
</script>

<template>
    <div :style="cssVar" class="button-display d-flex align-items-center gap-3">
        <button :style="buttonStyle" class="btn" @click="onClickEmitAction">
            {{ this.title }}
        </button>
        <p class="m-0"><slot /></p>
    </div>
</template>

<style scoped lang="scss">
.button-display {
    font-size: 1.1rem;

    padding: 8px 12px;

    background-color: #23292f;

    border: 1px solid black;
    border-radius: 10px;

    button {
        width: 11rem;

        font-weight: 400;

        color: var(--profile-color);

        background-color: transparent;

        transition: 0.2s;

        &:hover {
            background-color: var(--profile-color);
            color: var(--profile-text-color);
        }
    }

    p {
        font-size: 1.1rem;
        font-weight: 300;
    }
}
</style>
