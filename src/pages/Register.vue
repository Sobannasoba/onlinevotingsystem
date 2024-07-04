<script>
    import router from '@/router';
import Headers from '../components/headers.vue';
    import axios from 'axios';
  export default {
    data() {
      return {
        form: {
          no_ic_or_no_metric: '',
          name: '',
          email: '',
          phone: ''
        }
      };
    },
    components:{
        Headers
    },
    methods:{
        submitForm() {
            console.log("hi")
        const formData = new FormData();
        formData.append('no_ic_or_no_metric', this.form.no_ic_or_no_metric);
        formData.append('name', this.form.name);
        formData.append('email', this.form.email);
        formData.append('class', this.form.class);

        axios.post('https://firaz-api.site/fyp/config/insert_user.php', formData)
            .then(response => {
            if (response.status === 200) {
                // Success
                console.log(response.data);
                localStorage.id = response.data
                router.push('/vote')
            } else {
                // Display error message
                console.log(response.data);
                alert(response.data)
            }
            })
            .catch(error => {
            // Handle request errors
            console.error(error);
            });
        }
    }
  };
  </script>

<template>
    <Headers></Headers>
    <img src="/assets/Screenshot 2024-05-19 192110.png" class="img1">
    <div style="display: grid;
                width: 100%;
                justify-items: center;">
      <h2>Registration Form</h2>
      <form class="mt-4 mb-4">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="form.name">
        </div>
        <div class="form-group">
          <label for="no_ic_or_no_metric">No Ic/No Matrix</label>
          <input type="text" class="form-control" id="no_ic_or_no_metric" v-model="form.no_ic_or_no_metric">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" v-model="form.email">
        </div>
        <div class="form-group">
          <label for="phone">Class</label>
          <input type="text" class="form-control" id="password" v-model="form.class">
        </div>
      </form>
      <button @click="submitForm" class="btn btn-primary">Submit</button>
    </div>
  </template>
  <style scoped>
  .img1{
    position:absolute;
    z-index:-1;
    width:100%;
    left:0;
    height:80%;
    top:110px;
  }
  </style>