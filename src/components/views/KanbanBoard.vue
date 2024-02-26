<script>
import Vue from 'vue';
import UserCard from './UserCard.vue';

export default {
  name: 'KanbanBoard',
  data() {
    return {
      draggable: 'draggable',
      isDropped: false,
      draggableContainer: null,
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
      console.log('!!');
      this.$router.push({ path: '/about', query: { id } });
    },
    handleDragStart(event) {
      event.dataTransfer.setData('text/html', event.target.outerHTML);
      this.parentElement = event.target.parentElement.getAttribute('data-id');
      this.isDropped = false;
      this.elementId = event.target.id;
    },
    handleDrop(event) {
      event.stopPropagation();
      const { target } = event;
      const data = event.dataTransfer.getData('text/html');
      this.isDropped = true;
      this.draggableContainer = target.getAttribute('data-id');
      if (target.getAttribute('data-id') !== this.parentElement && target.getAttribute('data-id') !== 'user_card') {
        target.innerHTML += data;
        target.addEventListener('dragstart', this.handleDragStart);
        target.childNodes.forEach((element) => element.addEventListener('click', this.handlerClick));
      } else if (target.getAttribute('data-id') === 'user_card') {
        target.parentElement.innerHTML += data;
        this.isDropped = true;
      } else {
        this.isDropped = true;
      }
    },
    addNewUserCard() {
      const { container } = this.$refs;

      const NewUserCardComponent = Vue.extend(UserCard);
      const newUserCardInstance = new NewUserCardComponent({
        propsData: {
          handleDragStart: this.handleDragStart,
          handlerClick: this.handlerClick,
        },
      });
      newUserCardInstance.$store = this.$store;
      newUserCardInstance.$mount();
      container.appendChild(newUserCardInstance.$el);
    },

    updateUser(userInfo) {
      if (userInfo) {
        this.$store.dispatch('updateUser', userInfo);
      }
    },
  },
  watch: {

    isDropped(value) {
      if (value) {
        const block = document.querySelector(`[data-id=${this.parentElement}`).childNodes;
        const firstContainer = document.querySelector('[data-id="div-1"]').childNodes;
        block.forEach((element) => {
          if (element.id === this.elementId && this.draggableContainer !== this.parentElement) {
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
  <div id="app" class="container mt-5">
    <b-card-group deck class="row">
      <b-card bg-variant="info" class="col-md-4">
        <div class="block" data-id="div-1" @drop="handleDrop" @dragover.prevent ref="container">
          <UserCard
            :updateUser="updateUser"
            :handleDragStart="handleDragStart"
            :handlerClick="handlerClick"
            v-for="item, index in 4"
            :key="index"
            :index="index"
           />
        </div>
      </b-card>
      <b-card bg-variant="warning" class="col-md-4">
        <div class="block" data-id="div-2" @drop="handleDrop" @dragover.prevent></div>
      </b-card>
      <b-card bg-variant="danger" class="col-md-4">
        <div class="block" data-id="div-3" @drop="handleDrop" @dragover.prevent></div>
      </b-card>
    </b-card-group>
  </div>
</template>
<style scoped>
.block {
  width: 100%;
  height: 80vh;
  background-color:rgb(253, 253, 253);
  padding: 10px;
}

</style>
