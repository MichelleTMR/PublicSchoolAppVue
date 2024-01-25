<script setup>

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
    <!-- <div id="mySidenav" class="sidenav">
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

    </div> -->

        <div class="header">
            <img style="height:40px;" @click="openNav()" src="../assets/hamburgericon.svg" />
            <div style="display: flex; gap: 20px;">
                <div class="wrap">
                    <div class="search">
                        <input type="text" class="searchTerm" placeholder="What are you looking for?">
                        <button type="submit" class="searchButton"> <img id="searchicon" src="../assets/searchicon.png">
                            <i class="fa fa-search"> </i>
                        </button>
                    </div>
                </div>
                <h1 style="font-family: 'Concert One', sans-serif;">Hi, {{ userStore.state.userParent.userProfile.name }}!!
                </h1>
                <img id="profile-image" :src=userStore.state.userParent.userProfile.profile_image />
            </div>
        </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Concert+One&display=swap');

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 135px;
    margin-top: 10px;
    height: 200px;
    /* margin-bottom: 80px; */
    /* padding-left: 16px; */
    /* padding-right: 16px; */
    align-items: center;
    /* background-color: rgb(187, 243, 243); */
    border-radius: 15px;
    background-color: rgb(182, 216, 233);
}
</style>