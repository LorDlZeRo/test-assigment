import Vue from 'vue';
import VueRouter from 'vue-router';
import UserSurvey from '../views/UserSurvey.vue';
import KanbanBoard from '../views/KanbanBoard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: KanbanBoard,
  },
  {
    path: '/about',
    component: UserSurvey,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
