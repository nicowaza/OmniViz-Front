<template>
    <v-bottom-nav
      app
      :active.sync="bottomNav"
      :value="true"
      fixed
      color="#231846"
    >
      <v-btn
        class='btnColor'
        flat
        value="fingerprint"
        to="/login"
        fingerprint v-if="!isLoggedIn"
      >
        <span class='btnColor'>Login</span>
        <v-icon class='btnColor'>fingerprint</v-icon>
      </v-btn>

      <v-btn
        class='btnColor'
        flat
        value="account_box"
        to="/register"
        v-if="!isLoggedIn"
      >
        <span class='btnColor'>Register</span>
        <v-icon class='btnColor'>account_box</v-icon>
      </v-btn>

      <v-btn class='btnColor' v-if="isLoggedIn && this.user.role === 'teacher'">
        <span class='btnColor'><CreateRoom  class="createRooms btnColor"/></span>
        <v-icon class='btnColor'>home</v-icon>
      </v-btn>

      <v-btn
        class='btnColor'
        flat
        value="account_box"
        to="/roomsList"
        v-if="isLoggedIn"
      >
        <span>Classes</span>
        <v-icon>account_box</v-icon>
      </v-btn>

      <v-btn
        class='btnColor'
        flat
        value="home"
        to="/about"
        fingerprint v-if="isLoggedIn"
      >
        <span class='btnColor'>Acceuil</span>
        <v-icon class='btnColor'>home</v-icon>
      </v-btn>

      <v-btn
        class='btnColor'
        flat
        to="/login"
        value="exit_to_app"
        v-if="isLoggedIn"
        @click="logout"
      >
        <span>Logout</span>
        <span class='btnColor'>Logout</span>
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
  @include v-btnIvory();
}
.btnColor {
  @include v-btnIvory();
}
.createRooms {
  @include v-btnIvory();
  margin-top: -11px;
  font-size: 14px;
}
</style>
