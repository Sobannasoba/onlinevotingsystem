<template>
    <headers></headers>
    <div class="container"
         style="display: grid;
            width: 100vw;
            justify-items: center;">
      <h1>Vote Session Time</h1>
  
      <div class="form-group my-3 "
      style="display: flex;">
        <label for="start-time" placeholder="Select a date" name="starttime" class="form-control">Start Time:</label>
        <flat-pickr
            v-model="startTime"
            :config="config"
        ></flat-pickr>
      </div>
  
      <div class="form-group my-3"
      style="display: flex;">
        <label for="end-time" placeholder="Select a date" name="endtime" class="form-control">End Time:</label>
        <flat-pickr
            v-model="endTime"
            :config="config"
        ></flat-pickr>
      </div>
  
      <button class="btn btn-primary" @click="startVoteSession">Start</button>
    </div>
  </template>
  
  <script>
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import headers from '../components/headers2.vue';
  import axios from 'axios'
  export default {
    data() {
      return {
        startTime: null, // Holds the selected start time
        endTime: null, // Holds the selected end time
        config:{
            //altFormat: "F j, Y",
            enableTime:true,
            noCalendar:true,
            altInput: true,
            dateFormat: "H:i",
        }
      };
    },
    mounted() {
      // Initialize flatpickr for the start and end time inputs
    },
    components:{
        flatPickr,
        headers
    }
    ,
    methods: {
      async startVoteSession() {
        if (this.startTime && this.endTime) {
          // Perform your desired action here with the selected start and end times
          // Make an HTTP POST request to the PHP script
            const formData = new FormData();
            formData.append('start_vote', this.startTime);
            formData.append('end_vote', this.endTime);
            axios.post('http://128.199.118.198/fyp/config/insert_session.php', formData)
            .then(response => {
                console.log(response.data);
                alert(response.data)
                // Handle the response as needed
            })
            .catch(error => {
                console.error(error);
                // Handle the error as needed
            });
        } else {
          alert('Please select both start and end times.');
        }
      },
    },
  };
  </script>
  
  <style>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>