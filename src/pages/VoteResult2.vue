<template>
    <Headers></Headers>
    <div class="container mt-5"
         style="display: grid;
                width: 100vw;
                justify-items: center;">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">List Vote</h4>
            </div>
            <div class="card-body">
              <table class="table table-bordered">
                <thead class="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Vote Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="votes.length === 0">
                    <td colspan="2">No votes recorded</td>
                  </tr>
                  <tr v-else v-for="vote in votes" :key="vote.id">
                    <td>{{ vote.name }}</td>
                    <td>{{ vote.positions }}</td>
                    <td>{{ vote.vote_count }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Headers from "../components/headers2.vue"
  import axios from "axios"
  export default {
    name: 'VoteResult2',
    data() {
      return {
        votes: []
      };
    },
    components:{
        Headers
    },
    created() {
      this.fetchVotes();
    },
    methods: {
      async fetchVotes() {
        // Fetch the vote data from the server and store it in this.votes
        // This is where you would make an API call or retrieve the data from a store
        try {
                const response = await axios.get('https://firaz-api.site/fyp/config/vote_results.php');
                this.votes = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    }
  };
  </script>