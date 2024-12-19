import { createPinia } from 'pinia';
import { useNotesStore } from '~/stores/notes';

export default defineNuxtPlugin((nuxtApp) => {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);

    if (process.client) {
        const notesStore = useNotesStore(pinia);
        notesStore.loadNotes();
    }
});
