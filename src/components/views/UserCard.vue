<script>
import axios from 'axios'
export default {
  name: 'UserCard',
  props: {
    handleDragStart: Function,
  },
  data() {
      return {
        user: null
      }
    },
  created() {
    axios.get('https://randomuser.me/api')
      .then(response => {
        this.user = response.data
        console.log('User fetched successfully');
      })
      .catch(error => {
        console.error('Failed to fetch user:', error);
      });
  },
  methods: {
    updateUser() {
      if (this.user) {
        console.log(this.$store);
        this.$store.dispatch('updateUser', this.user);
      }
    },
    handleDragOver(event) {
        event.preventDefault();
    },
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUser;
      }
    }
}
</script>
<template>
  <div class="user-card" :id="user?.info.seed" :draggable="true" @dragstart="handleDragStart"  @dragover="handleDragOver">
    {{ user?.results[0].name.title }} : {{ user?.results[0].name.first }} {{ user?.results[0].name.last }}  
  </div>
</template>
<style scoped>
.user-card {
    margin-top: 5px;
    background-color:rgb(126, 221, 109);

  }
</style>
