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
    registerAvatarUrl: null,
    registerUniversity: null,
    registerRole: null,
    registerErrors: [],
    loginEmail: null,
    loginPassword: null,
    loginError: null,
    user: null,
    isLoggedin: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setRegisterErrors(state, error) {
      state.registerErrors = error;
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
    setRegisterAvatarUrl(state, avatarUrl) {
      state.registerAvatarUrl = avatarUrl;
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
    setIsLoggedin(state, isLoggedin) {
      state.isLoggedin = isLoggedin;
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
            commit('setIsLoggedin', false);
            commit('setLoginEmail', null);
            commit('setLoginPassword', null);
            router.push('/login');
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
        avatarUrl: state.registerAvatarUrl,
        university: state.registerUniversity,
        role: state.registerRole,
      })
        .then(({ data }) => {
          if (data.status === 200 && data.success) {
            alert('user created');
            console.log(data);
            router.push('/login');
          } else if (data.status === 400) {
            const errorData = data.errors;
            const errorDataMsg = errorData.map((e) => {
              return e.msg;
            });
            commit('setRegisterErrors', errorDataMsg);
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
            commit('setUser', data.user);
            commit('setIsLoggedin', true);
            router.push('/');
          } else {
            commit('setLoginError', data.message);
            router.push('/login');
          }
        })
        // .then(() => {
        //   commit('setIsLoggedin', true);
        //   router.push('/');
        // })
        .catch(() => {
          // console.log(errors);
          // commit('setLoginError', errors);
        });
    },
  },

  // getters: {
  //   isLoggedIn(state) {
  //     return !!state.isLoggedIn;
  //   },
  // },
};
