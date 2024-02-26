import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: [],
  },
  mutations: {
    setUser(state, user) {
      state.user.push(user);
      // Vue.set(state, 'user', user);
    },
  },
  actions: {
    updateUser(context, newUser) {
      context.commit('setUser', newUser);
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
});
