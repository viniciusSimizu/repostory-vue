<script>
import { useModalAlert } from '@/stores/modal-alert.store'
import { ModalAlertModel } from '@/components/models/modal-alert.model'
import ErrorAlertComponent from '@/components/ErrorAlertComponent.vue'
import SuccessAlertComponent from '@/components/SuccessAlertComponent.vue'
import { useUserPermissionsStore } from '@/stores/user-permissions.store'

export default {
    components: { SuccessAlertComponent, ErrorAlertComponent },
    data() {
        return {
            modalStore: useModalAlert(),
            infos: new ModalAlertModel(),
            show: false,
            permissions: useUserPermissionsStore(),
        }
    },
    mounted() {
        console.log(this.$route)
        console.log(this.$router)
        this.modalStore.$subscribe(() => {
            this.infos = this.modalStore.getInfosState
            this.show = this.modalStore.getShowState
        })
    },
}
</script>

<template>
    <RouterView id="main"></RouterView>
    <ErrorAlertComponent
        v-bind:error-alert="infos"
        v-bind:show-state="show"
        @exit="modalStore.closeModal()"
    />
    <SuccessAlertComponent
        v-bind:success-alert="infos"
        v-bind:show-state="show"
        @exit="modalStore.closeModal()"
    />
</template>

<style lang="scss">
#main {
    min-height: 100vh;
    width: 100vw;
    max-width: 100vw;
}

.authentication-input {
    width: 100%;
    height: 3.2rem;

    padding: 0 1rem;

    font-size: 1.3rem;
    color: white;

    background-color: #202a36;

    border-color: white;
    border-radius: 4px;

    transition: 0.1s;

    &::placeholder {
        transition: 0.2s;
        color: white;
    }

    &:focus {
        font-size: 1rem;

        &::placeholder {
            transition: 0.2s;
            font-size: 1rem;
        }
    }
}
</style>
