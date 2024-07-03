<script>
import router from "@/router";
import Headers from "../components/headers.vue"
import axios from "axios"

export default {
  data() {
    return {
      positions: [],
      selectedVotes: {}
    };
  },
  components: {
    Headers
  },
  created() {
    this.fetchParticipants();
  },
  methods: {
    async fetchParticipants() {
      try {
        const response = await axios.get('https://128.199.118.198/fyp/config/participants.php');
        this.groupByPosition(response.data);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    },
    groupByPosition(participants) {
      // Group participants by position
      this.positions = participants.reduce((acc, participant) => {
        if (!acc[participant.positions]) {
          acc[participant.positions] = [];
        }
        acc[participant.positions].push(participant);
        return acc;
      }, {});
    },
    async vote() {
      try {
        const formData = new FormData();
        formData.append('user_id', localStorage.id);

        // Append each selected vote to the FormData
        for (const position in this.selectedVotes) {
          formData.append(`participant_vote_ids[]`, this.selectedVotes[position]);
        }

        const response = await axios.post('https://128.199.118.198/fyp/config/insert_multiple_votes.php', formData);
        console.log(response.data);
        alert(response.data);
        router.push("/");
      } catch (error) {
        console.error('Error casting vote:', error);
      }
    },
    selectVote(position, candidateId) {
      this.selectedVotes[position] = candidateId;
      console.log(this.selectedVotes)
    }
  }
};
</script>
<style scoped>
.card {
  margin-bottom: 20px;
}
</style>

<template>
  <Headers></Headers>
  <div style="display: grid; width: 100vw; justify-items: center; margin-top:15vh;">
    <h2>Vote</h2>
    <div v-for="(candidates, position) in positions" :key="position" class="col-md-6 mt-2">
        <div class="row" style="display: flex; justify-content: center;">
            <h4>{{ position }}</h4>
            <div class="row">
                <div v-for="candidate in candidates" :key="candidate.id" class="col-md-3 mb-4">
                    <div class="card">
                        <img :src="candidate.pfp_image" class="card-img-top" alt="Option Image" style="height: 150px;">
                        <div class="card-body">
                            <h5 class="card-title">{{ candidate.name }}</h5>
                            <button @click="selectVote(position, candidate.id)" :class="selectedVotes[position] === candidate.id ? 'btn btn-success' : 'btn btn-primary'">
                            {{ selectedVotes[position] === candidate.id ? 'Selected' : 'Vote' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    <button @click="vote" class="btn btn-primary">Submit Votes</button>
  </div>
</template>