<template>
    <v-bottom-nav
      app
      :active.sync="bottomNav"
      :value="true"
      fixed
      color="#231846"
    >
      <v-btn
        color="teal"
        flat
        value="fingerprint"
        to="/login"
        fingerprint v-if="!isLoggedIn"
      >
        <span style="color: #B39DDB">Login</span>
        <v-icon style="color: #B39DDB">fingerprint</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="account_box"
        to="/register"
        v-if="!isLoggedIn"
      >
        <span style="color: #B39DDB">Register</span>
        <v-icon style="color: #B39DDB">account_box</v-icon>
      </v-btn>

      <v-btn v-if="isLoggedIn && this.user.role === 'teacher'">
        <CreateRoom style = "margin-top: -11px;"/>
        <v-icon>home</v-icon>
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
import CreateRoom from './CreateRoom.vue';

export default {
  name: 'BottomNav',

  components: {
    CreateRoom,
  },

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

<style lang="scss">
  .v-item-group.v-bottom-nav .v-btn {
    max-width: 105px;
}
.v-item-group.v-bottom-nav .v-btn .v-btn__content i.v-icon {
  color: map-get($colors, custom-pink);
}
.v-btn__content {
  color: map-get($colors, custom-pink);
}
</style>
