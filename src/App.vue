<script>
  import { RouterLink, RouterView } from 'vue-router'
  import SignIn from './components/SignIn.vue'
  
  export default {
    components: {
      SignIn
    },
  }
</script>

<template>
  <div class="full-page">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-band mb-5">
      <div class="container">
        <span class="navbar-text font-weight-bold">Student Console</span>
      </div>
    </nav>
    <RouterView/>
  </div>
</template>

<style>
  .full-page {
    height: 100vh;
    display: block;
  };

  .navbar-band {
      background-color: #343a40; 
      color: #fff; 
      padding: 10px 0; 
    }
</style>
