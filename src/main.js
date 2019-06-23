// import VueSocketIO from 'vue-socket.io';
import io from 'socket.io-client';
import VueSocketio from 'vue-socket.io-extended';
import { sync } from 'vuex-router-sync';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// import VueCookies from 'vue-cookies';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';

Vue.use(Vuetify);
sync(store, router);

const socket = io('http://localhost:5000', {
  autoConnect: false,
});

Vue.use(VueSocketio, socket, { store });

// Vue.use(VueCookies);

// eslint-disable-next-line import/prefer-default-export
// export const SocketInstance = io('http://localhost:5000', { forceNew: true });

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketInstance,
// }));
// Vue.use(VueSocketIO, SocketInstance);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
