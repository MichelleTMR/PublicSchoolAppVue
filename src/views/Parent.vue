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
        </div>
        <div class="container">
            <!-- <div class="welcomeBar">
                <div class="alert">All Jefferson County schools closed for snow day!!</div>
                <div class="welcome">
                </div>
            </div> -->
            <div class="main">
                <div class="header">
                    <img style="height:40px;" @click="openNav()" src="../assets/hamburgericon.svg" />
                    <div style="display: flex; gap: 20px;">
                        <div class="wrap">
                            <div class="search">
                                <input type="text" class="searchTerm" placeholder="What are you looking for?">
                                <button type="submit" class="searchButton"> <img id="searchicon"
                                        src="../assets/searchicon.png">
                                    <i class="fa fa-search"> </i>
                                </button>
                            </div>
                        </div>
                        <h1 style="font-family: 'Concert One', sans-serif;">Hi, {{userStore.state.userParent.userProfile.name }}!!</h1>
                        <img id="profile-image" :src=userStore.state.userParent.userProfile.profile_image />
                    </div>
                </div>
                <div class="information">
                    <div class="studentInformation">
                        <div class="schoolnotifications" style="font-weight: bold; font-size: 40px;">Your Students</div>
                        <div class="student-container">
                            <div class="student-content" v-for="student in userStore.state.userStudents"
                                @click="$router.push(`/student/${student.student_id}`)">
                                <div class="studentschoolsbuses">{{ student.student_name }}</div>
                                <img class="student-image" :src="student.student_picture">
                                <div class="alertSubtitle">{{ student.school.school_name }} {{ student.school.school_type }}
                                </div>
                                <!-- <h1>{{ getStudentBrithdate(student.student_birthdate) }}</h1> -->
                                <div> DOB: {{ student.student_birthdate }}</div>
                                <div> {{ student.grade }}</div>
                                <div> {{ student.age }}</div>
                            </div>
                        </div>
                        <div class="schoolnotifications" style="font-weight: bold; font-size: 40px;">Your Schools</div>
                        <div class="school-container">
                            <div class="school-content" v-for="school in studentschools"
                                @click="$router.push(`/school/${school.school_id}`)">
                                <div>
                                    <img class="school-image" :src="school.school_image">
                                    <div class="studentschoolsbuses">{{ school.school_name }} {{ school.school_type }}</div>
                                    <div>{{ school.school_address }}</div>
                                    <div>{{ school.school_hours }}</div>
                                    <div>{{ school.phone_number }}</div>
                                </div>
                            </div>
                            <div>
                                <div class="schoolnotifications" style="font-weight: bold; font-size: 40px; ">Buses</div>
                                <div class="buses-container">
                                    <div class="buses-content" v-for="bus in studentbuses"
                                        @click="$router.push(`/buses/${bus.buses_id}`)">
                                        <img class="buses-image" src="../assets/bus-1.png">
                                        <div class="studentschoolsbuses">Bus#{{ bus.bus_number }}</div>
                                        <div>Departure Time: {{ bus.pm_departure_time }}</div>
                                        <div>Driver: {{ bus.driver }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="calendarBar">
                        <img id="calendar-image" src="../assets/calendar3.webp">
                        <div>
                            <div class="schoolnotifications" style="font-weight: bold; font-size: 30px;">School
                                Notifications</div>
                            <div class="notification">
                                <div class="alertTitle">Norton Elementary</div>
                                <h4 class="alertSubtitle">Thursday, January 25</h4>
                                <div>8:40am: Donuts with Grownups - Gibson</div>
                                <div>5:00pm: Basketball Practice</div>
                                <div>5:15pm: Drama Club</div>
                                <div>5:30pm: Swim Practice</div>
                                <div class="specialalert">February 12th Parent-Teacher Conference! </div>
                            </div>
                            <div class="notification">
                                <div class="alertTitle">Kammerer Middle</div>
                                <h4 class="alertSubtitle">Thursday, January 25</h4>
                                <div>Robotics Club First Day!</div>
                                <div>8:30am: ACCESS Testing</div>
                                <div>4:30pm: Cheer Practice</div>
                                <h4 class="specialalert">April 1-5 No school, Spring Break</h4>
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

div>* {
    font-family: 'Concert One', sans-serif;
}

.studentschoolsbuses {
    font-size: xx-large;
    color: rgb(11, 153, 175);
}

.student-image {
    width: 180px;
    height: 180px;
    border-radius: 10px;
}

.alertTitle {
    font-size: 40px;
    font-weight: bold;
    color: rgb(11, 153, 175);
}

.alertSubtitle {
    text-decoration: underline lightgoldenrodyellow;
    color: #ba9b58;

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
    padding: 40px;
    height: 60%;
    margin-right: 90px;
}

.studentInformation {
    padding-left: 90px;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

#calendar-image {
    height: 10%;
    width: 100%;
    border-radius: 20px;
}

.notification {
    background-color: rgb(182, 216, 233);
    border-radius: 10px;
    border: 2px solid lightblue;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 250px;
    /* width: 250px; */
}

.student-content {
    background-color: antiquewhite;
    border-radius: 10px;
    padding: 16px;
    height: 300px;
}

.student-container {
    display: flex;
    flex-direction: row;
    gap: 16px;
}

.school-content {
    background-color: rgb(182, 216, 233);
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
    /* padding-top: 25px; */
    background-color: beige;
    border-radius: 10px;
    padding: 16px;
    width: 200px;
}

.buses-container {
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding: 16px;
}

.specialalert {
    color: red;

}

.schoolnotifications {
    color: rgb(178, 162, 14);
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 135px;
    margin-top: 10px;
    height: 100px;
    /* margin-bottom: 80px; */
    /* padding-left: 16px; */
    /* padding-right: 16px; */
    align-items: center;
    /* background-color: rgb(187, 243, 243); */
    border-radius: 15px;
    background-color: rgb(182, 216, 233);
}

/* The side navigation menu */
.sidenav {
    height: 100%;
    /* 100% Full-height */
    width: 0;
    /* 0 width - change this with JavaScript */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Stay on top */
    top: 0;
    /* Stay at the top */
    left: 0;
    background-color: #f4d796;
    /* Black*/
    overflow-x: hidden;
    /* Disable horizontal scroll */
    padding-top: 60px;
    /* Place content 60px from the top */
    transition: 0.5s;
    /* 0.5 second transition effect to slide in the sidenav */
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
    .sidenav {
        padding-top: 15px;
    }

    .sidenav a {
        font-size: 18px;
    }
}


/* searchbar */
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

body {
    background: #f2f2f2;
    font-family: 'Open Sans', sans-serif;
}

.search {
    width: 100%;
    position: relative;
    display: flex;
}

.searchTerm {
    width: 100%;
    border: 3px solid rgb(178, 162, 14);
    border-right: none;
    padding: 5px;
    height: 30px;
    border-radius: 30px 0 0 30px;
    outline: none;
    color: #9DBFAF;
}

.searchTerm:focus {
    color: rgb(178, 162, 14);
}

.searchButton {
    width: 60px;
    height: 46px;
    border: 1px solid rgb(178, 162, 14);
    background: rgb(178, 162, 14);
    text-align: center;
    color: #fff;
    border-radius: 0 30px 30px 0;
    cursor: pointer;
    font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap {
    width: 15%;
    position: absolute;
    top: 4%;
    left: 60%;
    /* transform: translate(-50%, -50%); */
}

#searchicon {
    height: 20px;
    width: 20px;
}</style>