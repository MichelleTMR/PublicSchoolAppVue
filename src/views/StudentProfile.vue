<script setup>
import { useUserStore } from '@/stores/usersstore'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()

const studentId = route.params.id

const studentInfo = () => {
    const students = userStore.state.userStudents
    for(let i=0; i < students.length; i++){
        if(studentId == students[i].student_id){
            return students[i]
        }
    }
}

let student = studentInfo()
console.log(student)

</script>

<template>
<div class="wrapper"> 
        <div class="container-background">
            <img class="background-pic" src="../assets/blankbackground.png" />
        </div>
        <div class="container">
            <h1>{{ student.student_name }}</h1>
            <h1>Student's Bus ID: {{ student.bus_id }}</h1>
            <h1>{{ student.grade }}</h1>
            <h1>{{ student.student_birthdate }}</h1>
            <h1>{{ student.age}}</h1>
            <img :src=student.student_picture> 
    
        </div>

    </div>

</template>

<style scoped>
.wrapper{
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
    /* display: flex; */
    flex-direction: row;
    align-items: center;
    justify-content: center;  
    gap: 50px;
    top: 0%;
    left: 7%;
    border-radius: 10px;
    background-color: rgb(246, 226, 150);
    height: 3rem;
    width: 85vw;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.5rem;
    position: absolute;
}
</style>