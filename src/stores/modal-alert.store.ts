import { defineStore } from 'pinia'
import { ModalAlertModel } from '@/components/models/modal-alert.model'

export const useModalAlert = defineStore('errorAlert', {
    state: () => ({
        show: false,
        infos: new ModalAlertModel(),
    }),
    getters: {
        getShowState: (state) => state.show,
        getInfosState: (state) => state.infos,
    },
    actions: {
        closeModal() {
            this.show = false
            this.infos = new ModalAlertModel()
        },
        openModal(infosToDisplay: ModalAlertModel) {
            this.show = true
            this.infos = infosToDisplay
        },
    },
})
