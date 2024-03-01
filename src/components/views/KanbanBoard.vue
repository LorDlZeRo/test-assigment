<script>
import Vue from 'vue';
import UserCard from './UserCard.vue';
import {
  getFirstContainer,
  handlerClick,
  handleDragEnter,
  handleDragStart,
  handleDrop,
  addNewUserCard,
  removePreiousUserCard,
} from '../helpers/helper';

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
  methods: {
    getFirstContainer,
    handlerClick,
    handleDragEnter,
    handleDragStart,
    handleDrop,
    addNewUserCard,
    removePreiousUserCard,
  },
  mounted() {
    this.firstContainer = this.getFirstContainer(this.containersDataId[0]);
  },
  watch: {
    isDropped(value) {
      if (value) {
        this.removePreiousUserCard();

        if (this.firstContainer.childNodes.length === 0) {
          this.addNewUserCard(Vue, UserCard);
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
