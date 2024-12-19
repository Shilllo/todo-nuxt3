<template>
    <div v-if="note">
        <input
            type="text"
            v-model="note.title"
            placeholder="Введите название заметки"
            @focus="beginEdit"
            @blur="endEdit"
        />
        <ul>
            <li v-for="(todo, index) in note.todos" :key="index">
                <input
                    type="checkbox"
                    v-model="todo.completed"
                    @focus="beginEdit"
                    @blur="endEdit"
                />
                <input
                    type="text"
                    v-model="todo.text"
                    @focus="beginEdit"
                    @blur="endEdit"
                />
                <button @click="deleteTodo(index)">Удалить</button>
            </li>
        </ul>
        <button @click="addTodo">Добавить задачу</button>
        <button @click="saveChanges">Сохранить изменения</button>
        <button @click="cancelEdit">Отменить (выйти без изменений)</button>
        <button @click="undoLastChange" :disabled="undoStack.length === 0">
            Отменить изменение (назад)
        </button>
        <button @click="redoLastUndo" :disabled="redoStack.length === 0">
            Повторить отмененное изменение (вперед)
        </button>
    </div>
    <div v-else>
        <p>Заметка не найдена.</p>
        <button @click="goBack">Вернуться на главную</button>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useNotesStore } from '~/stores/notes';
import { useRouter, useRoute } from 'vue-router';

const notesStore = useNotesStore();
const router = useRouter();
const route = useRoute();

const originalNote = notesStore.getNoteById(route.params.id)
    ? JSON.parse(JSON.stringify(notesStore.getNoteById(route.params.id)))
    : null;

const note = originalNote ? reactive({ ...originalNote }) : null;

const undoStack = reactive([]);
const redoStack = reactive([]);

let initialState = note ? JSON.stringify(note) : null;
const oldState = ref(null);

const beginEdit = () => {
    oldState.value = JSON.stringify(note);
};

const endEdit = () => {
    const currentState = JSON.stringify(note);
    if (oldState.value && oldState.value !== currentState) {
        recordChangeWithState(oldState.value);
    }
    oldState.value = null;
};

const addTodo = () => {
    recordChange();
    note.todos.push({ text: 'Новая задача', completed: false });
};

const deleteTodo = (index) => {
    recordChange();
    note.todos.splice(index, 1);
};

const saveChanges = () => {
    if (note) {
        notesStore.updateNote(note.id, note);
    }
    router.push('/');
};

const cancelEdit = () => {
    if (confirm('Вы уверены, что хотите выйти без изменений?')) {
        if (note) {
            resetNote();
        }
        router.push('/');
    }
};

const recordChange = () => {
    undoStack.push(JSON.stringify(note));
    redoStack.splice(0, redoStack.length);
};

const recordChangeWithState = (state) => {
    undoStack.push(state);
    redoStack.splice(0, redoStack.length);
};

const undoLastChange = () => {
    if (undoStack.length > 0) {
        redoStack.push(JSON.stringify(note));
        const previousState = JSON.parse(undoStack.pop());
        replaceNote(previousState);
    }
};

const redoLastUndo = () => {
    if (redoStack.length > 0) {
        undoStack.push(JSON.stringify(note));
        const nextState = JSON.parse(redoStack.pop());
        replaceNote(nextState);
    }
};

const replaceNote = (newState) => {
    note.title = newState.title;
    note.todos.splice(0, note.todos.length, ...newState.todos);
};

const resetNote = () => {
    const state = JSON.parse(initialState);
    replaceNote(state);
};

const goBack = () => {
    router.push('/');
};
</script>

<style>
ul {
    list-style-type: none;
}

li {
    margin-left: 20px;
}

input[type='text'] {
    padding: 5px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
}

button {
    margin: 5px;
    padding: 5px 10px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background: #218838;
}
</style>
