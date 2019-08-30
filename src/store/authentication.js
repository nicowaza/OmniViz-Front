// import Vue from 'vue';
// import Vuex from 'vuex';
import router from '../router';
import HTTP from '../http';


// Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    registerEmail: null,
    registerUsername: null,
    registerPassword: null,
    registerConfirmedPassword: null,
    registerFirstname: null,
    registerLastname: null,
    registerAvatar: null,
    registerUniversity: null,
    registerRole: null,
    registerConfirm: null,
    registerErrors: null,
    loginEmail: null,
    loginPassword: null,
    loginError: null,
    user: null,
    isLoggedIn: false,
    isConnected: false,
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setRegisterErrors(state, error) {
      state.registerErrors = error;
    },
    setRegisterConfirm(state, confirm) {
      state.registerConfirm = confirm;
    },
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    },
    setRegisterConfirmedPassword(state, confirmedPassword) {
      state.registerConfirmedPassword = confirmedPassword;
    },
    setRegisterUsername(state, username) {
      state.registerUsername = username;
    },
    setRegisterFirstname(state, firstname) {
      state.registerFirstname = firstname;
    },
    SetRegisterLastname(state, lastname) {
      state.registerLastname = lastname;
    },
    setRegisterAvatar(state, payload) {
      state.registerAvatar = payload;
    },
    setRegisterUniversity(state, University) {
      state.registerUniversity = University;
    },
    setRegisterRole(state, role) {
      state.registerRole = role;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setLoginEmail(state, email) {
      state.loginEmail = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    SOCKET_CONNECT(state) {
      state.isConnected = true;
    },
    SOCKET_DISCONNECT(state) {
      state.isConnected = false;
    },
  },

  actions: {
    logout({ commit }) {
      return HTTP().get('/users/logout')
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log('user logged out');
            commit('setUser', null);
            commit('setIsLoggedIn', false);
            commit('SOCKET_DISCONNECT', false);
            commit('setLoginEmail', null);
            commit('setLoginPassword', null);
            // this.$socket.close();
            router.push('/login');
            // window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    register({ commit, state }) {
      commit('setRegisterErrors', null);
      return HTTP().post('/users/register', {
        email: state.registerEmail,
        password: state.registerPassword,
        confirmedPassword: state.registerConfirmedPassword,
        username: state.registerUsername,
        firstname: state.registerFirstname,
        lastname: state.registerLastname,
        avatar: state.registerAvatar,
        university: state.registerUniversity,
        role: state.registerRole,
      })
        .then(({ data }) => {
          if (data.status === 200 && data.success) {
            const confirmMessage = data.success;
            commit('setRegisterConfirm', confirmMessage);
            console.log('confirmMessage', confirmMessage);
            router.push('/login');
            setTimeout(() => {
              commit('setRegisterConfirm', null);
            }, 3000);
          } else if (data.status === 400) {
            const errorData = data.errors;
            const errorDataMsg = errorData.map((e) => {
              return e.msg;
            });
            console.log(errorDataMsg);
            commit('setRegisterErrors', errorDataMsg);
            console.log(state.registerErrors);
          }
        })
        .catch(() => {
          // ne marche pas...les erreurs sont attrapées dans le else if précédent...to fix

        });
    },

    login({ commit, state }) {
      commit('setLoginError', null);
      return HTTP().post('/users/login', {
        email: state.loginEmail,
        password: state.loginPassword,
      })
        .then(({ data }) => {
          if (data.user) {
            console.log(data);
            commit('setIsLoggedIn', true);
            commit('setUser', data.user);
            // commit('SOCKET_CONNECT', true);
            // this.$socket.open();
            router.push('/home');
            // this.$socket.open();
          } else {
            commit('setLoginError', data.message);
            router.push('/login');
          }
        })

        .catch(() => {
          // console.log(errors);
          // commit('setLoginError', errors);
        });
    },

    socket_connect({ commit }) {
      commit('SOCKET_CONNECT', true);
    },

    socket_disconnect({ commit }) {
      commit('SOCKET_DISCONNECT', true);
    },
  },

  getters: {
    isLoggedIn(state) {
      return !!state.isLoggedIn;
    },
    isConnected(state) {
      return !!state.isConnected;
    },
    // hasAvatar(state) {
    //   return !!state.user.avatar;
    // },
  },
};
