<script>
import UserCard from './components/views/UserCard.vue';
import Vue from 'vue';
export default {
  name: 'App',
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
    handleDragStart(event) {
      event.dataTransfer.setData('text/html', event.target.outerHTML);
      this.parentElement = event.target.parentElement.className;
      this.isDropped = false;
      this.elementId = event.target.id;
    },
    handleDrop(event) {
      event.preventDefault();
      const data = event.dataTransfer.getData('text/html');
      const { target } = event;
      if (target.className !== this.parentElement) {
        target.innerHTML += data;
        target.addEventListener('dragstart', this.handleDragStart);
        this.isDropped = true;
      }
    },
    addNewUserCard() {
      const container = this.$refs.container; 
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
          this.isFirstContainerEmpty = true
          console.log('YES');
          this.addNewUserCard()
        } else {
          this.isFirstContainerEmpty = false
        }
      }
    },
  },
};
</script>

<template>
  <div id="app" class="main-container mt-3 d-flex justify-content-center align-items-center">
    <b-card-group deck class="container d-flex justify-content-space-evenly">

      <b-card bg-variant="info" text-variant="white" class="text-center custom-card">
        <div class="div-1" @drop="handleDrop" @dragover.prevent ref="container">
          <UserCard :handleDragStart="handleDragStart" v-for="item in 4"/>     
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
