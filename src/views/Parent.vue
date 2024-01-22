<script setup>
import { ref, reactive, defineComponent} from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/usersstore'

const userStore = useUserStore();
console.log(userStore.state.userParent)
</script>

<template>
<div class="wrapper">
        <div class="container-background">
            <img class="background-pic" src="../assets/ParentStudentbackground.png" />
        </div>
        <div class="container">
            <div class="menu">
                
            <button @click="Schools">Schools🏡</button> <!-- list of all the schools -->
            <button @click="">Compounds🚌</button>     <!-- list of all compounds -->
            <RouterLink to="/student">Student👾</RouterLink>   <!-- list of all kids -->
            <RouterLink to="/updateinfo">Update Profile</RouterLink>   <!-- update profile info page -->
            <RouterLink to="/AddressRequest">Address Request</RouterLink>   <!-- address request info page -->
            <!-- <RouterLink v-if="roles.include('parent1')" to="/AddressRequest">Address Request</RouterLink>   address request info page -->
        </div>

            <div>
            <h1>Hi, {{ userStore.state.userParent.userProfile.name }}!!</h1>
            <h1>{{ userStore.state.userParent.userProfile.birthdate }}</h1>
            <h1>{{ userStore.state.userParent.userProfile.address }}</h1>
            <h1>{{ userStore.state.userParent.userProfile.phone_number }}</h1>
            <img :src=userStore.state.userParent.userProfile.profile_image /> 
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
    align-items: center;
    justify-content: center;  
    gap: 50px;
    /* position: absolute; */
    top: 25%;
    /* right: 45%; */
    left: 7%;
    border-radius: 10px;
    background-color: rgb(246, 226, 150);
    height: 3rem;
    width: 85vw;
        /* display: flex; */
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.5rem;
    position: absolute;
    /* font-style: italic; */
}

.menu {
    display: flex;
    flex-direction: row;
}

</style>