<template>
  <v-toolbar app fixed dark style = "height: 64px; background-color: #231846;">
    <v-avatar size="36px">
      <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="Avatar">
    </v-avatar>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat to="/roomsList" v-if="isLoggedIn">
        <v-icon class="mr-2">account_box</v-icon>
        Classes
        </v-btn>
      <v-btn flat to="/" v-if="isLoggedIn">
        <v-icon class="mr-2">account_box</v-icon>
        About
        </v-btn>
      <CreateRoom v-if="isLoggedIn && this.user.role === 'teacher'"/>
      <v-btn flat to="/register" v-if="!isLoggedIn">
        <v-icon class="mr-2">account_box</v-icon>
        Register
        </v-btn>
      <v-btn flat to="/login" v-if="!isLoggedIn">
        <v-icon class="mr-2">fingerprint</v-icon>
        Login
        </v-btn>
      <v-btn flat to="/login" v-if="isLoggedIn" @click="logout">
        <v-icon class="mr-2">exit_to_app</v-icon>
        Logout
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex';
import CreateRoom from './CreateRoom.vue';

export default {
  name: 'HeaderBar',

  components: {
    CreateRoom,
  },

  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn',
      'isConnected',
    ]),
    ...mapState('rooms', [
      'rooms',
    ]),
    ...mapState('authentication', [
      'user',
    ]),
  },

  methods: {
    ...mapActions('authentication', [
      'logout',
    ]),
    leaveRoom() {
      this.$socket.emit('leave', ({
        room: this.room,
      }),
      console.log(this.user.username));
    },
  },
};
</script>

<style>

</style>
