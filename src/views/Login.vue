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
            <img id="logo"
                src="https://static.vecteezy.com/system/resources/thumbnails/002/478/053/small_2x/welcome-back-label-lettering-with-ribbon-frame-free-vector.jpg" />
            <input v-model="email" type="text" placeholder="email" />
            <input v-model="password" type="text" placeholder="password">
            <button @click="login">Login</button>
            <RouterLink to="/register">Register</RouterLink>
        </div>
    </div>
</template>

<style scoped>
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

#logo {
    height: 6rem;
    widows: 6rem;
}
</style>