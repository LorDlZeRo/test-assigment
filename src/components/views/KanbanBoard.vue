<script>
import Vue from 'vue';
import UserCard from './UserCard.vue';

export default {
  name: 'KanbanBoard',
  data() {
    return {
      draggable: 'draggable',
      isDropped: false,
      elementId: null,
      parentElement: null,
      isFirstContainerEmpty: false,
    };
  },
  components: {
    UserCard,
  },

  methods: {
    handlerClick(event) {
      const { id } = event.target;
      this.$router.push({ path: '/about', query: { id } });
    },
    handleDragStart(event) {
      event.dataTransfer.setData('text/html', event.target.outerHTML);
      this.parentElement = event.target.parentElement.className;
      this.isDropped = false;
      this.elementId = event.target.id;
    },
    handleDrop(event) {
      event.preventDefault();
      const { target } = event;
      const data = event.dataTransfer.getData('text/html');
      this.isDropped = true;
      if (target.className !== this.parentElement && target.className !== 'user-card') {
        target.innerHTML += data;
        target.addEventListener('dragstart', this.handleDragStart);
        target.addEventListener('click', this.handlerClick);
      } else if (target.className === 'user-card') {
        target.parentElement.innerHTML += data;
      }
    },
    addNewUserCard() {
      const { container } = this.$refs;
      const NewUserCardComponent = Vue.extend(UserCard);
      const newUserCardInstance = new NewUserCardComponent({
        propsData: {
          handleDragStart: this.handleDragStart,
        },
      });
      newUserCardInstance.$store = this.$store;
      newUserCardInstance.$mount();
      container.appendChild(newUserCardInstance.$el);
    },

    updateUser(userInfo) {
      console.log('123123123');
      if (userInfo) {
        this.$store.dispatch('updateUser', userInfo);
      }
    },
  },
  watch: {

    isDropped(value) {
      if (value) {
        const block = document.querySelector(`.${this.parentElement}`).childNodes;
        const firstContainer = document.querySelector('.div-1').childNodes;
        block.forEach((element) => {
          if (element.id === this.elementId) {
            element.remove();
          }
        });
        if (firstContainer.length === 0) {
          this.isFirstContainerEmpty = true;
          this.addNewUserCard();
        } else {
          this.isFirstContainerEmpty = false;
        }
      }
    },
  },
};
</script>

<template>
  <div id="app" class="main-container mt-3 d-flex justify-content-center align-items-center">
    <router-view></router-view>
    <b-card-group deck class="container d-flex justify-content-space-evenly">
      <b-card bg-variant="info" text-variant="white" class="text-center custom-card">
        <div class="div-1" @drop="handleDrop" @dragover.prevent ref="container">
          <UserCard
            :updateUser="updateUser"
            :handleDragStart="handleDragStart"
            v-for="item, index in 4"
            :key="index"
            :index="index"
           />
        </div>
      </b-card>
      <b-card bg-variant="warning" text-variant="white" class="text-center custom-card">
        <div class="div-2" @drop="handleDrop" @dragover.prevent></div>
      </b-card>
      <b-card bg-variant="danger" text-variant="white" class="text-center custom-card">
        <div class="div" @drop="handleDrop" @dragover.prevent></div>
      </b-card>
    </b-card-group>
  </div>
</template>
<style scoped>
.container {
  width: 90%;
  height: 800px;
}
.main-container {
  background-color: aquamarine;
}
.div-1 {
  width: 100%;
  height: 100%;
  background-color:cadetblue;
}

.div-2 {
  width: 100%;
  height: 100%;
  background-color:cadetblue;
}

.div {
  width: 100%;
  height: 100%;
  background-color:cadetblue;
}
.draggable {

  background-color:rgb(221, 71, 71);
}
.custom-card {
  width: 300px;
}

</style>
