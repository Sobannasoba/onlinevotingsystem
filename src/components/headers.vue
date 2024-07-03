<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning fixed-top">
    <div class="container">
      <a class="navbar-brand" to="#">FYP Voting System</a>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleNavbar"
        :aria-expanded="navbarOpen"
        aria-controls="navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ 'show': navbarOpen }"
        id="navbarNav"
      >
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <!--<li class="nav-item">
            <router-link class="nav-link" to="#">Vote</router-link>
          </li>-->
          <!-- <li class="nav-item">       
            <router-link class="nav-link" to="/results">Results</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Admin Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      navbarOpen: false
    };
  },
  methods: {
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    }
  }
};
</script>