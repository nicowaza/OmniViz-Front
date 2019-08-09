// import VueSocketIO from 'vue-socket.io';
import io from 'socket.io-client';
import VueSocketio from 'vue-socket.io-extended';
import { sync } from 'vuex-router-sync';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import moment from 'moment';
// import VueCookies from 'vue-cookies';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
// import './registerServiceWorker';


Vue.prototype.moment = moment;

Vue.use(Vuetify);
sync(store, router);

const socket = io(process.env.SOCKET_CONNECT, {
  autoConnect: false,
});

Vue.use(VueSocketio, socket, { store });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
