<script setup>
import router from '@/router';
import { ref } from 'vue';

const email = ref('')
const username = ref('')
const password = ref('')


function register() {

    const reqBody = { 
        "email": email.value,
        "username": username.value,
        "password": password.value,
        "registration_code": registration_code.value
    }

    fetch("http://localhost:3000/users",
    {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(reqBody),
            method: "POST"
    })
    .then(response => {
        if(response.status === 201) {
            alert("Account Created! Please login to continue")
            router.push("/")
        } else {
            alert("Something went wrong! Please try again.")
        }

    })
    .catch(error => {
        console.log(error)
    })
}
</script>

<template>
     <div class="container-background">
        <img class="background-pic" src="../assets/Registration.png"/>
    </div>
    <div class="container">
        <!-- <img id="logo"
            src="" /> -->
        <h1>Register</h1>
        <input v-model="email" type="text" placeholder="Email" />
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="text" placeholder="Password"/>
        <input v-model="registration_code" type="text" placeholder="Registration Code"/>
        <button @click="register">Register</button>
        <RouterLink to="/">Cancel</RouterLink>
    </div>
</template>

<style scoped>
.container-background{
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
        height: 100vh;
    }
    #logo {
        height: 6rem;
        widows: 6rem;
    }
</style>