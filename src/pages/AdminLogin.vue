<template>
    <div class="container"
         style="display: grid;
                width: 100vw;
                justify-items: center;">
      <div class="card p-4 shadow">
        <h2 class="text-center mb-4">Admin Login</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
            const formData = new FormData();
            formData.append('username', this.username);
            formData.append('password', this.password);
          const response = await axios.post('https://128.199.118.198/fyp/config/login.php', formData);
  
          if (response.data.success) {
            localStorage.setItem('isLoggedIn', 'true');
            this.$router.push('/admin');
          } else {
            console.log(response.data)
            alert('Invalid username or password');
          }
        } catch (error) {
          console.error('Error logging in:', error);
        }
      }
    }
  };
  </script>