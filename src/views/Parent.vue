<script setup>
import { ref, reactive, defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/usersstore'

const userStore = useUserStore();
console.log(userStore.state.userParent)

// let schoolArray = userStore.state.userSchools

// function getSchools() {
//     try {
//         fetch("http://localhost:3000/schools",
//             {
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     "school": userStore.state.userParent
//                 }
//                 ),
//                 method: "POST"
//             })
//             .then(response => {
//                 return response.json()

//             }).then(json => {
//                 userStore.state.userSchools.push(...json)
//             })
//     } catch (error) {
//         console.log(error)
//     }
// }

// if (schoolArray.length == 0) getSchools()













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
                    <div style="font-style: bold;">School Notifications</div>
                    <div class="notification">
                        <p class="alert-title">Norton Elementary</p>
                        <p>Tuesday, January 23</p>
                        <p>8:40am Donuts with Grownups - Gibson</p>
                        <p>5:00pm Basketball Practice</p>
                        <p> AM Drama Club</p>
                    </div>
                    <div class="notification">
                        <p class="alert-title">Kammerer Middle</p>
                        <p>Tuesday, January 23</p>
                        <p>Robotics Club First Day!</p>
                        <p>8:30am ACCESS Testing</p>
                        <p>4:30pm Cheer Practice</p>
                        <p>April 1-5 No school, Spring Break</p>
                    </div>
                    <div class="notification">
                        <p class="alert-title">Ballard High School</p>
                        <p>Monday, January 29</p>
                        <p>3:30pm Chess Club</p>
                        <p>Wednesday, January 31</p>
                        <p>6:30pm Winter Play "Alice in Wonderland"</p>
                        <p>Monday, February 5</p>
                        <p>7:00pm Jazz Concert</p>
                    </div>
                </div>

                <div class="content">

                </div>
            </div>
            <div>
                <h1>Students</h1>
            </div>
            <div>
                <h1>Buses</h1>
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
.alert-title{
    /* display: flex;
    align-items: center; */
    font-style: bold;
}
.wrapper {
    position: relative;
    height: 100vh;
    margin-left: 75px;
    margin-right: 75px;
    overflow-y: scroll;
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
    /* background-color: rgb(243, 240, 188); */
    width: 25%;
    padding: 16px;
    height: 60%;
}

#calendar-image{
    height: 10%;
    width: 100%;
    border-radius: 20px;
}

.notification {
    background-color: beige;
    border-radius: 10px;
    border: 2px solid;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-style: bold;
}


</style>