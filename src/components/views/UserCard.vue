<script>
import axios from 'axios';

export default {
  name: 'UserCard',
  props: {
    handleDragStart: Function,
  },
  data() {
    return {
      user: null,
      isDragging: false,
      counter: 0,
    };
  },
  methods: {
    handlerClick() {
      this.$router.push({ path: '/about', query: { id: this.user?.info.seed } });
    },
  },
  created() {
    axios.get('https://randomuser.me/api')
      .then((response) => {
        this.user = response.data;
        this.$store.commit('setUser', response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch user:', error);
      });
  },
};
</script>
<template>
  <div class="user-card"
   :id="user?.info.seed"
   :draggable="true"
   @dragstart="handleDragStart"
   @click="handlerClick"
  >
    {{ user?.results[0].name.title }} :
    {{ user?.results[0].name.first }} {{ user?.results[0].name.last }}
  </div>
</template>
<style scoped>
.user-card {
    margin-top: 5px;
    background-color:rgb(126, 221, 109);
  }
</style>
