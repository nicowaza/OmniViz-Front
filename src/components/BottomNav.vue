<template>
    <v-bottom-nav
      app
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="blue-grey"
    >
      <v-btn
        color="teal"
        flat
        value="fingerprint"
        to="/login"
        fingerprint v-if="!isLoggedIn"
      >
        <span>Login</span>
        <v-icon>fingerprint</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="account_box"
        to="/register"
        v-if="!isLoggedIn"
      >
        <span>Register</span>
        <v-icon>account_box</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="account_box"
        to="/roomsList"
        v-if="isLoggedIn"
      >
        <span>Classes</span>
        <v-icon>account_box</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="home"
        to="/about"
        fingerprint v-if="isLoggedIn"
      >
        <span>Acceuil</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        to="/login"
        value="exit_to_app"
        v-if="isLoggedIn"
        @click="logout"
      >
        <span>Logout</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-bottom-nav>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'BottomNav',
  data() {
    return {
      bottomNav: 'recent',
    };
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
  },
};
</script>

<style>

</style>
