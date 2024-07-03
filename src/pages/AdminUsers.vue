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
                const response = await axios.get('https://128.199.118.198/fyp/config/users.php');
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
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
                                            <th>Created At</th>
                                            <th>Updated At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in users" :key="user.id">
                                            <td>{{ user.id }}</td>
                                            <td>{{ user.username }}</td>
                                            <td>{{ user.name }}</td>
                                            <td>{{ user.email }}</td>
                                            <td>{{ user.role }}</td>
                                            <td>{{ formatDate(user.created_at) }}</td>
                                            <td>{{ formatDate(user.updated_at) }}</td>
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