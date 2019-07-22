// import createPersistedState from 'vuex-persistedstate';

import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './authentication';
import rooms from './rooms';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  // state: {
  //   baseUrl: '/api',
  // },
  modules: {
    authentication,
    rooms,
  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    // createPersistedState(),
  ],
});
