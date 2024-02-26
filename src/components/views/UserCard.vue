<script>
import axios from 'axios';

export default {
  name: 'UserCard',
  props: {
    handleDragStart: Function,
    handlerClick: Function,
  },
  data() {
    return {
      user: null,
      isDragging: false,
      counter: 0,
    };
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
  <button class="user-card btn btn-outline-success w-100 mb-2"
    data-id="user_card"
    :id="user?.info.seed"
    :draggable="true"
    @dragstart="handleDragStart"
    @click="handlerClick"
  >
    <img :id="user?.info.seed" :src="user?.results[0].picture.medium" alt="Фото" :draggable="false">
    <hr>
    {{ user?.results[0].name.title }} :
    {{ user?.results[0].name.first }} {{ user?.results[0].name.last }}
  </button>
</template>
