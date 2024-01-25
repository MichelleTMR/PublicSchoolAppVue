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
   

<!-- form starting -->
<div class="container">
  <form action="action_page.php">

    <!-- <label for="fname">First Name</label> -->
    <label for="studentname"> Full Name</label>
    <input type="text" id="studentname" name="firstname" placeholder="Your name..">
    <select name="studentname" id="studentsname">
        <option value="">--Please choose student--</option>
        <option v-for="id in approvedStudents" :value="id">{{ getStudentName(id) }}</option>
    </select>
    

    <label for="lname">Previous Address</label>
    <input type="text" id="lname" name="address" placeholder="Previous Address">

    <label for="lname">Address Line1</label>
    <input type="text" id="lname" name="address" placeholder="Address Line1">

    <label for="lname">Address Line2</label>
    <input type="text" id="lname" name="address" placeholder="Address Line2">

    <label for="country">City</label>
    <select id="country" name="country">
      <option value="usa"></option> 
      <option value="australia">Louisville</option>
      <option value="canada">Lyndon</option>
    </select>

    <label for="country">State</label>
    <select id="country" name="country">
      <option value="usa"></option> 
      <option value="australia">Kentucky</option>
      <option value="canada">Ohio</option>
      <option value="canada">Indiana</option>
      <option value="canada">Virginia</option>
      <option value="canada">Illinois</option>
    </select>

    <label for="country">ZIP Code</label>
    <input  type="text" id="country" name="country">
      
    <label for="country">Country</label>
    <select id="country" name="country">
       <option value="usa">USA</option> 
      <option value="australia">Australia</option>
      <option value="canada">Canada</option>
    </select>

    <label for="subject">Additional Information</label>
    <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>

    <input @click="submitRequest()" type="submit" value="Submit">

  </form>
</div>
<!-- end of form -->
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
    width: 90%;
    height: 1000px;
}


/* form style */
/* Style inputs with type="text", select elements and textareas */
input[type=text], select, textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */ 
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type=submit]:hover {
  background-color: #45a049;
}

/* Add a background color and some padding around the form */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
/* end of form style */
</style>