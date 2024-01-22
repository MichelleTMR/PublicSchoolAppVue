<script setup>
import {RouterLink} from 'vue-router';
</script>

<template>
    <div id="container">
        <RouterLink to="/profile">🏡</RouterLink>
        <RouterLink to="/students">📖</RouterLink>
        <RouterLink to="/buses">👾</RouterLink>
        <RouterLink to="/buscompound">👾</RouterLink>
        <RouterLink to="/schools">👾</RouterLink>
    </div>
    
<h1>posts</h1>
</template>

<style scoped>
#container{
    background-color: white;
    height: 2rem;
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.5rem;
}
</style>