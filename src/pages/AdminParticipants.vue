<script>
import axios from 'axios';
import Headers from '../components/headers2.vue';

export default {
  name: 'Admin Participants',
  components: {
    Headers
  },
  data() {
    return {
      participants: [],
      showModal: false,
      id : '',
      name: '',
      email: '',
      phone: '',
      pfpimage: '',
      positions: ''
    };
  },
  created() {
    this.fetchParticipants();
  },
  computed(){
    //this.fetchParticipants();
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())}`;
    },
    padZero(value) {
      return value.toString().padStart(2, '0');
    },
    convertToBase64(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.pfpimage = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async fetchParticipants() {
      try {
        const response = await axios.get('https://firaz-api.site/fyp/config/participants.php');
        this.participants = response.data;
      } catch (error) {
        console.error('Error fetching parcipants:', error);
      }
    },
    showPopup(){
        this.showModal = true;
        console.log(this.showModal);
    },
    editPopup(index){
        this.showModal = true;
        console.log(this.showModal);
        this.id = this.participants[index].id
        this.name = this.participants[index].name
        this.phone = this.participants[index].phone
        this.email = this.participants[index].email
        this.positions = this.participants[index].positions
    },
    closePopup() {
        this.showModal = false;
        this.id = ""
        this.name = ""
        this.phone = ""
        this.email = ""
        this.positions = ""
        this.fetchParticipants()
    },
    submitForm() {
      // Implement your form submission logic here
        console.log('Name:', this.name);
        console.log('Email:', this.email);
        console.log('Phone:', this.phone);
        if (this.id ==""){
            var url = "https://firaz-api.site/fyp/config/insert_participant.php"
        }
        else{
            var url = "https://firaz-api.site/fyp/config/update_participant.php"
        }
        const formData = new FormData();
        formData.append('id', this.id);
        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('phone', this.phone);
        formData.append('positions', this.positions);
        formData.append('pfp_image', this.pfpimage)
        axios.post(url, formData)
        .then(response => {
            console.log(response.data);
            alert(response.data)
            if (response.status == 200){
                this.closePopup();
            }
            // Handle the response as needed
        })
        .catch(error => {
            console.error(error);
            // Handle the error as needed
        });
      
    },
    deletePopup(index){
        const formData = new FormData();
        formData.append('id', index);
        axios.post("https://firaz-api.site/fyp/config/delete_participant.php", formData)
        .then(response => {
            console.log(response.data);
            alert(response.data)
            if (response.status == 200){
                this.closePopup();
            }
            // Handle the response as needed
        })
        .catch(error => {
            console.error(error);
            // Handle the error as needed
        });
    }
  }
};
</script>
<template>
    <Headers></Headers>
    <div class="container-fluid mt-5"
         style="display: grid;
                width: 100vw;
                justify-items: center;">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">
                            List Participant
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table id="participantVotesTable" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Image</th>
                                        <th>Position</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                        <th>
                                            <button type="button" class="btn btn-primary mx-5" @click="showPopup">
                                                Add
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(participant, index) in participants" :id="participant.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ participant.name }}</td>
                                        <td>{{ participant.email }}</td>
                                        <td>{{ participant.phone }}</td>
                                        <td><img :src="participant.pfp_image" alt="No image available"
                                                 style="height: 150px;"></td>
                                        <td>{{ participant.positions }}</td>
                                        <td>{{ formatDate(participant.created_at) }}</td>
                                        <td>{{ formatDate(participant.updated_at) }}</td>
                                        <td class="p-10">
                                            <button class="btn btn-primary mx-2" @click="editPopup(index)">
                                                Edit
                                            </button>
                                            <button class="btn btn-primary mx-2" @click="deletePopup(participant.id)">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div
      class="modal"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      :class="{ 'show': showModal }"
      style="display: block; background-color: rgba(0, 0, 0, 0.5);"
      v-if="showModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Contact Form</h5>
            <button
              type="button"
              class="close"
              @click="closePopup"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="phone">Phone</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phone"
                  v-model="phone"
                  required
                />
              </div>
              <div class="form-group">
                <label for="position">Position</label>
                <input
                  type="text"
                  class="form-control"
                  id="position"
                  v-model="positions"
                  required
                />
              </div>
              <div class="form-group">
                <label for="image">Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="file"
                  @change="convertToBase64"
                  required
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closePopup">
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="submitForm">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
</template>