<template>
    <div id="app">
        <header>
            <h1>Todo List</h1>
            <nav>
                <NuxtLink to="/">Главная</NuxtLink>
            </nav>
        </header>
        <main>
            <NuxtPage />
        </main>
    </div>
</template>

<script setup></script>

<style>
body {
    font-family: 'Roboto', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

#app {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

header {
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

header h1 {
    margin: 0;
    font-size: 2.5em;
}

header nav {
    margin-top: 10px;
}

header nav a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
    font-size: 1.2em;
    transition: color 0.3s;
}

header nav a:hover {
    color: #4caf50;
}

main {
    flex: 1;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

footer {
    background-color: rgba(0, 0, 0, 0.8);
    color: #aaa;
    text-align: center;
    padding: 10px;
    font-size: 0.9em;
}

footer p {
    margin: 0;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2em;
    }

    header nav a {
        font-size: 1em;
    }

    footer p {
        font-size: 0.8em;
    }
}

@media (max-width: 480px) {
    header {
        padding: 15px;
    }

    header h1 {
        font-size: 1.5em;
    }

    header nav a {
        font-size: 0.9em;
    }

    footer p {
        font-size: 0.7em;
    }
}

header,
main,
footer {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
