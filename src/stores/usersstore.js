import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import router from '@/router';

export const useUserStore = defineStore('auth', () => {

    const state = reactive({
        userParent: {},
        userStudents: [],
    })
    //difine state variables
    // const userParent = ref()

    //Getters
    const getUser = computed(() => state.userParent)

    //Actions
    function updateUser(user) {
        state.userParent = user
    }

    function login(email, password) {
        const reqBody = {
            "email": email,
            "password": password
        }
        try {
            fetch("http://localhost:3000/login",
                {
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reqBody),
                    method: "POST"
                })
                .then(response => {
                    return response.json()

                }).then(json => {
                    state.userParent = json
                })
        } catch (error) {
            console.log(error)
        }
    }

    return { state, getUser, updateUser, login }

}, {persist: true})
