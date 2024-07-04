<script>
import axios from 'axios';
import Headers from '../components/headers2.vue';

export default {
    name: 'AdminUsers',
    components: {
        Headers
    },
    data() {
        return {
            users: []
        };
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        formatDate(timestamp) {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())}`;
        },
        padZero(value) {
        return value.toString().padStart(2, '0');
        },
        async fetchUsers() {
            try {
                const response = await axios.get('https://firaz-api.site/fyp/config/users.php');
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        deleteUsers(){
            const formData = new FormData();
            axios.post("https://firaz-api.site/fyp/config/delete_users.php", formData)
            .then(response => {
                console.log(response.data);
                alert(response.data)
                if (response.status == 200){
                    this.fetchUsers();
                }
                // Handle the response as needed
            })
            .catch(error => {
                console.error(error);
                // Handle the error as needed
            });
        },
        deleteUser(id){
            if (id !== 1){
                const formData = new FormData();
                formData.append('id', id);
                axios.post("https://firaz-api.site/fyp/config/delete_user.php", formData)
                .then(response => {
                    console.log(response.data);
                    alert(response.data)
                    if (response.status == 200){
                        this.fetchUsers();
                    }
                    // Handle the response as needed
                })
                .catch(error => {
                    console.error(error);
                    // Handle the error as needed
                });
            }
            
        }
    }
};
</script>
<style>
.main{
   display: grid;
   width: 90vw;
}
</style>
<template>
    <div class="main">
        <Headers></Headers>
        <div class="container mt-5">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">List Users</h4>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered" id="userTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Class</th>
                                            <th>Created At</th>
                                            <th>Updated At</th>
                                            <th>
                                            <button type="button" class="btn btn-primary mx-5" @click="deleteUsers">
                                                Delete All User
                                            </button>
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in users" :key="user.id">
                                            <td>{{ user.id }}</td>
                                            <td>{{ user.username }}</td>
                                            <td>{{ user.name }}</td>
                                            <td>{{ user.email }}</td>
                                            <td>{{ user.role }}</td>
                                            <td>{{ user.class }}</td>
                                            <td>{{ formatDate(user.created_at) }}</td>
                                            <td>{{ formatDate(user.updated_at) }}</td>
                                            <td>
                                                <button type="button" class="btn btn-primary mx-5" @click="deleteUser(user.id)">
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
    </div>
</template>