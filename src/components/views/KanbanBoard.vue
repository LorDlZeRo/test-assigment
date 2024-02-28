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
      containersDataId: ['div-1', 'div-2', 'div-3'],
      dropableContainer: null,
      firstContainer: null,
    };
  },
  components: {
    UserCard,
  },
  mounted() {
    this.firstContainer = document.querySelector(`[data-id="${this.containersDataId[0]}"]`);
  },
  methods: {
    handleDragEnter(event) {
      event.preventDefault();
      const { target } = event;

      this.containersDataId.forEach((element) => {
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
      const NewUserCardComponent = Vue.extend(UserCard);
      const newUserCardInstance = new NewUserCardComponent({
        propsData: {
          handleDragStart: this.handleDragStart,
          handlerClick: this.handlerClick,
        },
      });
      newUserCardInstance.$store = this.$store;
      newUserCardInstance.$mount();
      this.firstContainer.appendChild(newUserCardInstance.$el);
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
        this.previousContainer.childNodes.forEach((element) => {
          if (element.id === this.droppedElementId) {
            element.remove();
            this.isDropped = false;
          }
        });
        if (this.firstContainer.childNodes.length === 0) {
          this.addNewUserCard();
        }
      }
    },
  },
};
</script>

<template>
  <div id="app" class="container pt-5">
    <v-layout row wrap>
      <v-flex xs4 v-for="containerId in containersDataId" :key="containerId">
        <v-card>
          <div class="block" :data-id="containerId" @drop="handleDrop"
              @dragenter="handleDragEnter"
              @dragover.prevent ref="container"
            >
              <template v-if="containerId === containersDataId[0]">
                <UserCard v-for="index in 4" :key="index" :index="index"
                    :updateUser="updateUser"
                    :handleDragStart="handleDragStart"
                    :handlerClick="handlerClick"
                  />
              </template>
            </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<style scoped>
.block {
  width: 100%;
  min-height: 90vh;
  padding: 10px;
  border-radius: 5px;
}

</style>
