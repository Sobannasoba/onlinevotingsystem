<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">FYP Voting System</a>
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
            <router-link class="nav-link" to="/admin/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/user">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/participants">Participants</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/results">Vote Results</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/session">Session</router-link>
          </li>
          <li class="nav-item" @click="logout">
            Log Out
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
    },
    logout(){
      localStorage.removeItem("isLoggedIn")
      this.$router.push('/login');
      console.log("why")
    }
  }
};
</script>