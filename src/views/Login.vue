<script setup >
import router from '@/router';
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/usersstore'

const userStore = useUserStore();

let email = ref('')
let password = ref('')

function login() {
    userStore.login(email.value, password.value)
    router.push({ path: "/parent" })
}

</script>

<template>
    <div class="wrapper">
        <div class="container-background">
            <img class="background-pic" src="../assets/2.png" />
        </div>
        <div class="container">
            <h1> Login</h1>
            <input class="textbox" v-model="email" type="text" placeholder="parentportal@email.com"/>
            <input class="textbox" v-model="password" type="password" placeholder="password">
            <button id="loginbutton" @click="login">Login</button>
            <RouterLink to="/register">Register Here</RouterLink>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Concert+One&display=swap');

div > * {
  font-family: 'Concert One', sans-serif;
}
.wrapper {
    position: relative;
    height: 100vh;
}

.container-background {
    display: flex;
    justify-content: center;
}

.background-pic {
    height: 100vh;
    width: auto;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: absolute;
    top: 35%;
    right: 45%;
}

.textbox{
    width: 15rem;
    height: 2.2rem;
    border-radius: 20px;
}
#loginbutton{
    width: 10rem;
    height: 2.0rem;
    border-radius: 10px;
}
</style>