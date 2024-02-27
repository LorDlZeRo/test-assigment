<script>
import Vue from 'vue';
import UserCard from './UserCard.vue';

export default {
  name: 'KanbanBoard',
  data() {
    return {
      isDropped: false,
      droppedElementId: null,
      previousContainer: null,
      isFirstContainerEmpty: false,
      handleDragEnterElement: null,
      dataIdArr: ['div-1', 'div-2', 'div-3'],
      dropableContainer: null,
    };
  },
  components: {
    UserCard,
  },

  methods: {
    handleDragEnter(event) {
      event.preventDefault();
      const { target } = event;

      this.dataIdArr.forEach((element) => {
        if (target.getAttribute('data-id') === element) {
          this.dropableContainer = target;
        }
      });
    },
    handlerClick(event) {
      const { id } = event.target;
      this.$router.push({ path: '/about', query: { id } });
    },
    handleDragStart(event) {
      const data = {
        element: event.target.outerHTML,
        dataId: event.target.id,
      };
      const jsonData = JSON.stringify(data);
      event.dataTransfer.setData('text/html', jsonData);
      this.previousContainer = event.target.parentElement;
    },
    handleDrop(event) {
      event.stopPropagation();
      if (this.previousContainer !== this.dropableContainer) {
        const draggedElement = JSON.parse(event.dataTransfer.getData('text/html'));
        this.isDropped = true;
        this.droppedElementId = draggedElement.dataId;
        this.dropableContainer.innerHTML += draggedElement.element;
        this.dropableContainer.childNodes.forEach((element) => {
          element.addEventListener('dragstart', this.handleDragStart);
          element.addEventListener('click', this.handlerClick);
        });
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
        const firstContainer = document.querySelector('[data-id="div-1"]').childNodes;
        this.previousContainer.childNodes.forEach((element) => {
          if (element.id === this.droppedElementId) {
            element.remove();
            this.isDropped = false;
          }

          if (firstContainer.length === 0) {
            this.addNewUserCard();
          }
        });
      }
    },
  },
};
</script>

<template>
  <div id="app" class="container mt-2">
    <b-card-group deck class="row">
      <b-card bg-variant="info" class="col-md-4">
        <div class="block" data-id="div-1" @drop="handleDrop" @dragenter="handleDragEnter"
        @dragover.prevent ref="container">
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
        <div class="block" data-id="div-2" @drop="handleDrop"
        @dragover.prevent @dragenter="handleDragEnter"></div>
      </b-card>
      <b-card bg-variant="danger" class="col-md-4">
        <div class="block" data-id="div-3" @drop="handleDrop"
        @dragover.prevent @dragenter="handleDragEnter"></div>
      </b-card>
    </b-card-group>
  </div>
</template>
<style scoped>
.block {
  width: 100%;
  min-height: 90vh;
  background-color:rgb(253, 253, 253);
  padding: 10px;
  border-radius: 5px;
}

</style>
