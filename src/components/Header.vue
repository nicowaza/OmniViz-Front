<template>
  <v-toolbar app fixed dark>
    <v-avatar size="36px">
      <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="Avatar">
    </v-avatar>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <CreateRoom/>
      <v-btn flat to="/register" v-if="!isAuthenticated()">
        <v-icon class="mr-2">account_box</v-icon>
        Register
        </v-btn>
      <v-btn flat to="/login" v-if="!isAuthenticated()">
        <v-icon class="mr-2">fingerprint</v-icon>
        Login
        </v-btn>
      <v-btn flat to="/login" v-if="isAuthenticated()" @click="logout()">
        <v-icon class="mr-2">exit_to_app</v-icon>
        Logout
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import CreateRoom from './CreateRoom.vue';
import Auth from '../helpers/Auth';

export default {
  name: 'HeaderBar',

  components: {
    CreateRoom,
  },
  methods: {
    isAuthenticated() {
      return Auth.isAuthenticated();
    },
    logout() {
      localStorage.removeItem('token');
      window.location.reload();
      // this.$router.push('/login');
    },
  },
};

</script>

<style>

</style>
