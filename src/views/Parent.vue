<script setup>
import { ref, reactive, defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/usersstore'

const userStore = useUserStore();
console.log(userStore.state.userParent)
let studentArray = userStore.state.userStudents

let fetchUrl = "http://localhost:3000/students?"
userStore.state.userParent.userRoles.forEach((role) => {
    fetchUrl += `studentId=${role.student_id}&`
})

function getStudentProfiles() {
    try {
        fetch(fetchUrl,
            {
                headers: { "Content-Type": "application/json" },
                method: "GET"
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

if (studentArray.length == 0) getStudentProfiles()

console.log(studentArray)

</script>

<template>
    <div class="wrapper">
        <div class="container-background">
            <img class="background-pic" src="../assets/ParentStudentbackground.png" />
        </div>
        <div class="container">
            <div class="welcomeBar">
                <div class="alert">All Jefferson County schools closed for snow day!!</div>
                <div class="welcome">
                    <h1>Hi, {{ userStore.state.userParent.userProfile.name }}!!</h1>
                    <img id="profile-image" :src=userStore.state.userParent.userProfile.profile_image />
                </div>
            </div>

            <div class="main">
                <div class="calendarBar">
                    <img id="calendar-image" src="../assets/Calendar-image.png">
                    <div>
                        <div style="font-weight: bold; font-size: 40px;">School Notifications</div>
                        <div class="notification">
                            <div class="alertTitle">dxlvkjzxlvlementary</div>
                            <p>Tuesday, January 23</p>
                            <p>8:40am Donuts with Grownups - Gibson</p>
                            <p>5:00pm Basketball Practice</p>
                            <p>AM Drama Club</p>
                        </div>
                    </div>
                </div>

                <div class="content">
                    <div style="font-weight: bold; font-size: 40px; padding-left: 16px;">Your Students</div>
                    <div class="student-container">
                        <div class="student-content" v-for="student in userStore.state.userStudents"
                            @click="$router.push(`/student/${student.student_id}`)">
                            <h1>{{ student.student_name }}</h1>
                            <h4>{{ student.student_birthdate }}</h4>
                            <h4>{{ student.school.school_name }} {{ student.school.school_type }}</h4>
                        </div>
                    </div>
                    <div style="font-weight: bold; font-size: 40px; padding-left: 16px;">Your Schools</div>
                    <div class="school-container">
                        <div class="school-content" v-for="student in userStore.state.userStudents"
                            @click="$router.push(`/student/${student.school.school_id}`)">
                            <img class="school-image" :src="student.school.school_image">
                            <h4>{{ student.school.school_name }} {{ student.school.school_type }}</h4>
                            <h4>{{ student.school.phone_number}}</h4>
                            <h4>{{ student.school.school_address }}</h4>
                            <h4>{{ student.school.school_hours }}</h4>
                        </div>
                    </div>
                    <div style="font-weight: bold; font-size: 40px; padding-left: 16px;">Buses</div>
                    <div class="buses-container">
                        <div class="buses-content" v-for="student in userStore.state.userStudents"
                            @click="$router.push(`/student/${student.bus.buses_id}`)">
                            <img class="buses-image" src="../assets/bus-1.png">
                            <h4>Driver: {{ student.bus.driver }}</h4>
                            <h4>Bus#{{ student.bus.bus_number}}</h4>
                            <h4>Departure Time: {{ student.bus.pm_departure_time }}</h4>
                        </div>
                    </div>
                </div>
            </div>
            


            <div>

                <h1>{{ userStore.state.userParent.userProfile.birthdate }}</h1>
                <h1>{{ userStore.state.userParent.userProfile.address }}</h1>
                <h1>{{ userStore.state.userParent.userProfile.phone_number }}</h1>

            </div>
        </div>

    </div>
</template>

<style scoped>
.alertTitle {
    font-size: 40px;
    font-weight: bold;
}

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
    position: absolute;
    top: 0%;
    left: 0%;
    /* background-color: rgb(245, 236, 186); */
    width: 100%;
    /* height: 20%; */
}

.alert {
    background-color: rgb(226, 89, 89);
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: bold;
}

#profile-image {
    height: 150px;
    width: 150px;
    border-radius: 50%;
}

.welcome {
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding: 16px;
}

.main {
    display: flex;
}

.calendarBar {
    width: 25%;
    padding: 16px;
    height: 60%;
}

#calendar-image {
    height: 10%;
    width: 100%;
    border-radius: 20px;
}

.notification {
    background-color: rgb(252, 252, 254);
    border-radius: 10px;
    border: 2px solid;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.student-content{
    background-color: antiquewhite;
    border-radius: 10px;
    padding: 16px;
}
.student-container{
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding-left: 16px;
}
.school-content{
    background-color: aqua;
    border-radius: 10px;
    padding: 16px;
}
.school-container{
    display: flex;
    flex-direction: row;
    gap: 16px;
}
.school-image{
    height: 200px;
    width: 300px;
}

.buses-image{
    height: 200px;
    width: 300px;
}
.buses-content{
    background-color: beige;
    border-radius: 10px;
    padding: 16px;
}
.buses-container{
    display: flex;
    flex-direction: row;
    gap: 16px;
}
</style>