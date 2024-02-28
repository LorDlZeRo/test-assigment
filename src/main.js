import Vue from 'vue';
import Vuetify from 'vuetify';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './components/store/store';
import router from './components/router';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuetify);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
