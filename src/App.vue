<template>
    <RouterView id="main"></RouterView>
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
