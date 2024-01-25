<script setup>
import { useUserStore } from '@/stores/usersstore'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue';

const route = useRoute()
const userStore = useUserStore()

const studentId = route.params.id

const studentInfo = () => {
    const students = userStore.state.userStudents
    for (let i = 0; i < students.length; i++) {
        if (studentId == students[i].student_id) {
            return students[i]
        }
    }
}

let student = studentInfo()
console.log(student)

function getStudentBrithdate(birthdate) {
    let date = new Date(birthdate)
    return date.toLocaleDateString()
}

function canEditStudent() {
    let roles = userStore.state.userParent.userRoles
    let roleType
    roles.forEach(element => {
        if (studentId == element.student_id) {
            roleType = element.role_id
        }
    });
    if (roleType == "role 2") {
        return true
    } else {
        return false
    }
}

async function getFile() {
    const img = document.querySelector("#image")

    let fileHandle
    [fileHandle] = await window.showOpenFilePicker();
    let fileToLoad = await fileHandle.getFile()
    console.log("file to load", fileToLoad)

    reader(fileToLoad, (result) => {
        console.log("RESULT", result)
        img.src = result
    })

}

function reader(file, callback) {
  const fr = new FileReader();
  fr.onload = () => callback(null, fr.result);
  fr.onerror = (err) => callback(err);
  fr.readAsDataURL(file);
}


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
            <img class="background-pic" src="../assets/blankbackground.png" />
            <div>
                <div class="container">

                <!-- <Navbar></Navbar> -->
<div class="header">
                    <img style="height:40px;" @click="openNav()" src="../assets/hamburgericon.svg" />
                    <div style="display: flex; gap: 20px;">
                        <div class="wrap">
                            <div class="search">
                                <input type="text" class="searchTerm" placeholder="What are you looking for?">
                                <button type="submit" class="searchButton"> <img id="searchicon"
                                        src="../assets/searchicon.png">
                                </button>
                            </div>
                        </div>
                        <h1 style="font-family: 'Concert One', sans-serif;">Hi, {{userStore.state.userParent.userProfile.name }}!!</h1>
                        <img id="profile-image" :src=userStore.state.userParent.userProfile.profile_image />
                    </div>
                </div>
                
                <div>{{ student.student_name }}</div>
                <div>Student's Bus ID: {{ student.bus_id }}</div>
                <div>{{ student.grade }}</div>
                <div>{{ getStudentBrithdate(student.student_birthdate) }}</div>
                <div>{{ student.age }}</div>
                <button v-if="canEditStudent()" @click="getFile()">Change Image</button>
                <div class="studentinformationdisplay">
                <img class="gradeimage" :src=student.student_picture>
                <img class="gradeimage" src="../assets/gardeimage.avif">
                </div>
                </div>
            </div>
        </div>
        <div>
        </div>
    </div>
   
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Concert+One&display=swap');

div>* {
    font-family: 'Concert One', sans-serif;
}

/* original style */

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
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 50px;
    top: 0%;
    left: 7%;
    border-radius: 10px;
    /* background-color: rgb(246, 226, 150); */
    height: 3rem;
    width: 85vw;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.5rem;
    position: absolute;
}

/* END OF ORIGINAL STYLE */


.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 135px;
    margin-top: 10px;
    height: 100px;
    margin-bottom: 80px;
    /* padding-left: 16px; */
    /* padding-right: 16px; */
    align-items: center;
    border-radius: 15px;
    background-color: rgb(182, 216, 233);
}

#profile-image {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    margin-top: 20px;
}

#searchicon {
    height: 20px;
    width: 20px;
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
body {
    background: #f2f2f2;
    font-family: 'Open Sans', sans-serif;
}
.wrap {
    width: 15%;
    position: absolute;
    left: 50%;
    margin-top: 3%;
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
/* end of sidebar */


.studentinformationdisplay{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border-radius: 30px;
} 

.changeimagebutton{
    display: flex;
    flex-direction: row;
    align-content: flex-end;
}
.gradeimage{
    height: 500px;
    width: 500px;
}
</style>