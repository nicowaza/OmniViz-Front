// import VueSocketIO from 'vue-socket.io';
// import io from 'socket.io-client';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.use(Vuetify);

// eslint-disable-next-line import/prefer-default-export
// export const SocketInstance = io('http://localhost:5000');


// Vue.use(VueSocketIO, SocketInstance);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
