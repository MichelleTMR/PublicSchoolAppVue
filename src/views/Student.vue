<script setup>
import { useUserStore } from '@/stores/usersstore'

const userStore = useUserStore();
let studentArray = userStore.state.userStudents

function getStudentsProfile() {
    try {
        fetch("http://localhost:3000/students",
            {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "students": userStore.state.userParent.userRoles
                }
                ),
                method: "POST"
            })
            .then(response => {
                return response.json()

            }).then(json => {
                userStore.state.userStudents.push(...json)
            })
    } catch (error) {
        console.log(error)
    }
}

if(studentArray.length == 0) getStudentsProfile()

</script>


<template>
    <div class="wrapper"> 
        <div class="container-background">
            <img class="background-pic" src="../assets/ParentStudentbackground.png" />
        </div>
        <div class="container">

            <RouterLink to="/updateinfo">Update Student Profile</RouterLink>   <!-- update profile info page -->
            <!-- <RouterLink v-if="roles.include('parent1')" to="/AddressRequest">Address Request</RouterLink>   address request info page -->
            <div v-for="student in userStore.state.userStudents" class="student-content" @click="$router.push(`/student/${student.student_id}`)">
            <h1>{{ student.student_name }}</h1>
        </div>
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
.student-content{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;  
    gap: 50px;
    /* position: absolute; */
    /* top: 25%; */
    /* right: 45%; */
    /* left: 7%; */
    /* height: 3rem; */
    /* width: 85vw; */
    justify-content: space-evenly;
    align-items: center;
    /* font-size: 1.5rem; */
    /* position: absolute; */
}


</style>