<template>
  <v-toolbar app fixed dark style = "height: 64px; background-color: #231846;">
    <v-avatar size="36px">
      <!-- <img v-bind:src="img" alt="Avatar"> -->
    </v-avatar>
    <v-toolbar-title v-if="this.user">Hello {{ this.user.username }}</v-toolbar-title>
    <v-toolbar-title v-else>Welcome To Omnilive</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat to="/roomsList" v-if="isLoggedIn">
        <v-icon class="mr-2">account_box</v-icon>
        Classes
      </v-btn>
      <v-btn flat to="/home" v-if="isLoggedIn">
        <v-icon class="mr-2">home</v-icon>
        Home
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


  // data() {
    // const { avatar } = this.user.avatar;
    // console.log(avatar);
  //   return {
  //     img: '',
  //     // avatar: '../public/img/avatar/slash.jpg',
  //   };
  // },
  components: {
    CreateRoom,
  },

  // mounted() {
  //   this.hasAvatar();
  // },

  // updated() {
  //   this.hasAvatar();
  // },

  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn',
      'isConnected',
      // 'hasAvatar',
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
  //   hasAvatar() {
  //     const { avatar } = this.user;
  //     this.img.push(avatar);
  //   },
  },
};
</script>

<style>

</style>
