<template>
  <v-toolbar app fixed dark>
    <v-avatar size="36px">
      <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="Avatar">
    </v-avatar>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <CreateRoom v-if="!isLoggedIn"/>
      <v-btn flat to="/register" v-if="isLoggedIn">
        <v-icon class="mr-2">account_box</v-icon>
        Register
        </v-btn>
      <v-btn flat to="/login" v-if="isLoggedIn">
        <v-icon class="mr-2">fingerprint</v-icon>
        Login
        </v-btn>
      <v-btn flat to="/login" v-if="!isLoggedIn" @click="logout">
        <v-icon class="mr-2">exit_to_app</v-icon>
        Logout
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CreateRoom from './CreateRoom.vue';
// import Auth from '../helpers/Auth';
// import HTTP from '../http';

export default {
  name: 'HeaderBar',

  components: {
    CreateRoom,
  },

  computed: {
    ...mapState('authentication', [
      'isLoggedin',
    ]),
  },

  methods: {
    ...mapActions('authentication', [
      'logout',
    ]),
  },
};

</script>

<style>

</style>
