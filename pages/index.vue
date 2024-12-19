<template>
    <div :class="{ app_container }">
        <button @click="navigateToCreateNote">Создать новую заметку</button>
        <ul>
            <li v-for="note in notes" :key="note.id">
                <h2>{{ note.title }}</h2>
                <ul>
                    <li
                        v-for="(todo, index) in note.todos"
                        :key="index"
                        :class="{ completed: todo.completed, todo }"
                    >
                        {{ todo.text }}
                    </li>
                </ul>
                <button @click="navigateToEdit(note.id)">Редактировать</button>
                <button @click="deleteNote(note.id)">Удалить</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useNotesStore } from '~/stores/notes';
import { useRouter } from 'vue-router';

const notesStore = useNotesStore();
const notes = computed(() => notesStore.notes); // Реактивная привязка
const router = useRouter();

const navigateToCreateNote = () => {
    const newNote = {
        id: Date.now().toString(),
        title: 'Новая заметка',
        todos: [],
    };
    notesStore.addNote(newNote);
    router.push(`/edit/${newNote.id}`);
};

const navigateToEdit = (id) => {
    router.push(`/edit/${id}`);
};

const deleteNote = (id) => {
    if (confirm('Вы уверены, что хотите удалить заметку?')) {
        notesStore.deleteNote(id);
    }
};
</script>

<style>
.app_container {
    width: 100%;
}
/* Добавляем стиль для перечеркнутых задач */
.completed {
    text-decoration: line-through;
    color: gray;
}

/* Стили для основного списка заметок */
body {
    font-family: 'Roboto', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: #fff;
    display: flex;
    padding: 10px;
    min-height: 100vh;
}

button {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #45a049;
}

ul {
    /* list-style-type: none; */
    padding: 0;
}

li {
    margin-bottom: 10px;
}

.todo {
    margin-left: 20px;
    margin-top: 20px;
}
h2 {
    font-size: 1.5em;
    margin: 0;
    background: rgba(255, 255, 255, 0.2);
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* Адаптивность */
@media (max-width: 768px) {
    h2 {
        font-size: 1.2em;
    }

    button {
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    h2 {
        font-size: 1em;
    }

    button {
        font-size: 12px;
    }
}

/* Кроссбраузерность */
button {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
