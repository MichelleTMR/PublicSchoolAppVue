<script setup>
import { useUserStore } from '@/stores/usersstore'
import { useRouter } from 'vue-router';
const router = useRouter()

const userStore = useUserStore();
let students = userStore.state.userStudents
let userRoles = userStore.state.userParent.userRoles
let approvedStudents = []

function getApprovedStudentIds() {
    userRoles.forEach(role => {
        if(role.role_id === "role 2") {
            approvedStudents.push(role.student_id)
        }
    })
    console.log(approvedStudents)
}

getApprovedStudentIds()

function getStudentName(id) {
    for(let i=0; students.length; i++) {
        if(students[i].student_id == id) {
            return students[i].student_name
        }
    }
}

function submitRequest(){
    alert("Your request has been submitted!")
    router.push('/parent')
}

</script>


<template>
    <div class="wrapper">
        <div class="container-background">
            <img class="background-pic" src="../assets/ParentStudentbackground.png" />
        </div>
        <div class="container">
            THIS IS A CONTAINER
            <label for="studentname"> Studnet Name</label>
            <select name="studentname" id="studentsname">
                <option value="">--Please choose an option--</option>
                <option v-for="id in approvedStudents" :value="id">{{ getStudentName(id) }}</option>
            </select>
            <button @click="submitRequest()"> Submit</button>
        </div>
    </div>
</template>


<style scoped>
.wrapper {
    position: relative;
    height: 100vh;
    margin-left: 75px;
    margin-right: 75px;
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
    background-color: rgb(99, 155, 204);
    border-radius: 30px solid;
    position: absolute;
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    left: 0;
    right: 0;
    width: 80%;
}
</style>