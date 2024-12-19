import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
    state: () => ({
        notes: [],
    }),
    actions: {
        loadNotes() {
            if (process.client) {
                const storedNotes = localStorage.getItem('notes');
                this.notes = storedNotes ? JSON.parse(storedNotes) : [];
            }
        },
        addNote(note) {
            this.notes.push({ id: Date.now().toString(), ...note });
            this.syncStorage();
        },
        deleteNote(id) {
            this.notes = this.notes.filter((note) => note.id !== id);
            this.syncStorage();
        },
        getNoteById(id) {
            return this.notes.find((note) => note.id === id);
        },
        updateNote(id, updatedNote) {
            const index = this.notes.findIndex((note) => note.id === id);
            this.notes[index] = updatedNote;
            this.syncStorage();
        },
        syncStorage() {
            if (process.client) {
                localStorage.setItem('notes', JSON.stringify(this.notes));
            }
        },
    },
});
