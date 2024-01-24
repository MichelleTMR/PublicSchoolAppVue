<script setup>
import { ref, reactive, defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/usersstore'


const userStore = useUserStore();
console.log(userStore.state.userParent)
let studentArray = userStore.state.userStudents
let studentbuses = []
let studentschools = []

let fetchUrl = "http://localhost:3000/students?"
userStore.state.userParent.userRoles.forEach((role) => {
    fetchUrl += `studentId=${role.student_id}&`
})

function getStudentProfiles() {
    try {
        fetch(fetchUrl,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": userStore.userParent.token
                },
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

function getSchoolBuses() {
    //Loop through the array of students (because the students objects contain the bus info)
    for (let i = 0; i < studentArray.length; i++) {
        //If our bus array is empty, go ahead and add the current student bus
        if (studentbuses.length == 0) {
            studentbuses.push(studentArray[i].bus)
        }
        //ELSE if there is a bus in our array, then check to see if it's buses_id matches the current student's bueses_id
        //The filter function returns an array.This array will contain any item that matches its condition (any bus in our studentbuses that has an id == the current student bus id)
        //Because filter will return an array, if this new array has ANY length, that means it has found a match
        //If it has found a match, that means the current student's bus already exists in our studentbuses array
        //SOOOO if the filter method return an array with a length == 0, THEN we push that bus to our studentbuses array
        else if (studentbuses.filter((bus) => bus.buses_id == studentArray[i].bus.buses_id).length == 0) {
            studentbuses.push(studentArray[i].bus)
        }
    }
}

function getSchools() {
    for (let i = 0; i < studentArray.length; i++) {
        if (studentschools.length == 0) {
            studentschools.push(studentArray[i].school)
        } else if (studentschools.filter((school) => school.school_id == studentArray[i].school.school_id).length == 0) {
            studentschools.push(studentArray[i].school)
        }
    }
}
// function getStudentBrithdate(birthdate) { LOOK AT WHY THIS IS NOT WORKING ... TRIED TO DO IT BY JUST CALLING THE FUCTION.
//     let date = new Date(birthdate)
//     return date.toLocaleDateString()
// }

getSchoolBuses()
getSchools()
// getStudentBirthdate()

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
</script>

<template>
    <div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
  
  <a href="#">Services</a>
  <a href="#">About</a>
  <RouterLink to="/addresschange">Address Change</RouterLink>
  <a href="#">Learning</a>
  <a href="#">Support</a>
  <a href="#">Activities</a>
  <a href="#">News</a>
  <a>Contact Us: </a>
<a>JCPS Call Center
(502) 313-HELP (4357)

jcps.help@jefferson.kyschools.us

More Contact Options</a>

</div>


    <div class="wrapper">
        <div class="container-background">
            <!-- <img class="background-pic" src="../assets/blankbackground.png" /> -->
        </div>
        <div class="container">

            <!-- <div class="sideBar">
                <RouterLink to="/addresschange">Address Change Request</RouterLink>
            </div> -->

            <!-- <div class="welcomeBar">
                <div class="alert">All Jefferson County schools closed for snow day!!</div>
                <div class="welcome">

                </div>
            </div> -->

            <div class="main">
                <div class="header">
                    <img style="height:40px;" @click="openNav()" src="../assets/hamburgericon.svg"/>
                    <div style="display: flex;">
                    <h1 style="font-family: 'Concert One', sans-serif;">Hi, {{ userStore.state.userParent.userProfile.name }}!!</h1>
                    <img id="profile-image" :src=userStore.state.userParent.userProfile.profile_image />
                    </div>
                </div>
                <div class="information">
                    <div class="studentInformation">
                        <div style="font-weight: bold; font-size: 40px;">Your Students</div>
                        <div class="student-container">
                            <div class="student-content" v-for="student in userStore.state.userStudents"
                                @click="$router.push(`/student/${student.student_id}`)">
                                <h4>{{ student.student_name }}</h4>
                                <!-- <h1>{{ getStudentBrithdate(student.student_birthdate) }}</h1> -->
                                <!-- <h4>{{ student.student_birthdate }}</h4> -->
                                <h4>{{ student.school.school_name }} {{ student.school.school_type }}</h4>
                            </div>
                        </div>
                        <div style="font-weight: bold; font-size: 40px;">Your Schools</div>
                        <div class="school-container">
                            <div class="school-content" v-for="school in studentschools"
                                @click="$router.push(`/school/${school.school_id}`)">
                                <div class="schoolcard">
                                <img class="school-image" :src="school.school_image">
                                <div>{{ school.school_name }} {{ school.school_type }}</div>
                                <div>{{ school.phone_number }}</div>
                                <div>{{ school.school_address }}</div>
                                <div>{{ school.school_hours }}</div>
                                </div>
                            </div>
                        </div>
                        <div style="font-weight: bold; font-size: 40px; ">Buses</div>
                        <div class="buses-container">
                            <div class="buses-content" v-for="bus in studentbuses"
                                @click="$router.push(`/student/${bus.buses_id}`)">
                                <img class="buses-image" src="../assets/bus-1.png">
                                <h4>Driver: {{ bus.driver }}</h4>
                                <h4>Bus#{{ bus.bus_number }}</h4>
                                <h4>Departure Time: {{ bus.pm_departure_time }}</h4>
                            </div>
                        </div>
                    </div>

                    <div class="calendarBar">
                        <img id="calendar-image" src="../assets/calendar3.webp">
                        <div>
                            <div id="schoolnotifications" style="font-weight: bold; font-size: 30px;">School Notifications</div>
                            <div class="notification">
                                <h4 class="alertTitle">Norton Elementary</h4>
                                <h4>Thursday, January 25</h4>
                                <p>8:40am Donuts with Grownups - Gibson</p>
                                <p>5:00pm Basketball Practice</p>
                                <p>AM Drama Club</p>
                            </div>
                            <div class="notification">
                                <h4 class="alertTitle">Kammerer Middle</h4>
                                <h4 >Thursday, January 25</h4>
                                <p>Robotics Club First Day!</p>
                                <p>8:30am ACCESS Testing</p>
                                <p>4:30pm Cheer Practice</p>
                                <h4 id="specialalert">April 1-5 No school, Spring Break</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Concert+One&display=swap');

div > * {
  font-family: 'Concert One', sans-serif;
}
.alertTitle {
    font-size: 40px;
    font-weight: bold;
}

.wrapper {
    position: relative;
    height: 100vh;
    overflow-x: hidden;

    /* margin-left: 75px;
    margin-right: 75px; */
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
    display: flex;
    top: 0%;
    left: 0%;
    padding-left: 45px;
    /* background-color: rgb(245, 236, 186); */
    width: 100vw;
    /* height: 20%; */
    background-image: url("../assets/blankbackground.png");
    background-repeat: repeat-x;
    background-size: 100% 100%;
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
    height: 80px;
    width: 80px;
    border-radius: 50%;
}

.welcome {
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding: 16px;
}

.information {
    display: flex;
    justify-content: space-between;
}

.sideBar {
    width: 25%;
    min-height: 100vh;
    background-color: rgb(249, 238, 151);
}

.calendarBar {
    width: 25%;
    padding: 16px;
    height: 60%;
}

.studentInformation {
    padding-left: 25px;
    width: 50%;
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

.student-content {
    background-color: antiquewhite;
    border-radius: 10px;
    padding: 16px;
}

.student-container {
    display: flex;
    flex-direction: row;
    gap: 16px;
}

.school-content {
    background-color: aqua;
    border-radius: 10px;
    padding: 16px;
    /* height: 280px; */
    width: 250px;
}

.school-container {
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding-left: 16px;
}

.school-image {
    height: 150px;
    width: 200px;
}

.buses-image {
    height: 150px;
    width: 200px;
}

.buses-content {
    padding-top: 25px;
    background-color: beige;
    border-radius: 10px;
    padding: 16px;
}

.buses-container {
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding: 16px;
}
#specialalert{
    color: red;

}
#schoolnotifications{
    color: rgb(178, 162, 14);
}
/* .schoolcard{

} */
.header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    align-items: center;
}

/* The side navigation menu */
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #f4d796; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation
#main {
  transition: margin-left .5s;
  padding: 20px;
} */

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>