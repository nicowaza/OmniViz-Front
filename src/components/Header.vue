<template>
  <v-toolbar app fixed dark>
    <v-avatar size="36px">
      <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="Avatar">
    </v-avatar>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <CreateRoom/>
      <v-btn flat to="/register">
        <v-icon class="mr-2">account_box</v-icon>
        Register
        </v-btn>
      <v-btn flat to="/login">
        <v-icon class="mr-2">fingerprint</v-icon>
        Login
        </v-btn>
      <v-btn flat to="/login" @click="logout()">
        <v-icon class="mr-2">exit_to_app</v-icon>
        Logout
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import CreateRoom from './CreateRoom.vue';
// import Auth from '../helpers/Auth';
import HTTP from '../http';

export default {
  name: 'HeaderBar',

  components: {
    CreateRoom,
  },
  methods: {
    // isAuthenticated() {
    //   return Auth.isAuthenticated();
    // },
    logout() {
      return HTTP().get('/users/logout')
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log('user logged out');
          }
          this.$router.push('/login');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};

</script>

<style>

</style>
