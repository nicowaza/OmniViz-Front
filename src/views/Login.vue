<template>
  <div>
    <v-layout row wrap>
      <v-flex style= "margin-top: 40vh" xs6 offset-xs3>
        <h1>Login</h1>
        <form action=""
        autocomplete="off"
        >
          <v-text-field
          label="email"
          placeholder="Email"
          :value="loginEmail"
          @input="setLoginEmail"
          ></v-text-field>

          <v-text-field
          label="Password"
          placeholder="Password"
          type="password"
          autocomplete="new-password"
          :value="loginPassword"
          @input="setLoginPassword"
          ></v-text-field>
        </form>

        <v-alert type="error" :value="loginError">
          {{loginError}}
        </v-alert>

        <v-btn color="green" dark @click="login">
          <v-icon class="mr-2">fingerprint</v-icon>
          Login
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'login',
  computed: {
    ...mapState('authentication', [
      'loginEmail',
      'loginPassword',
      'loginError',
    ]),
  },

  methods: {
    ...mapMutations('authentication', [
      'setLoginEmail',
      'setLoginPassword',
      'setIsLoggedIn',
    ]),
    ...mapActions('authentication', [
      'login',
      'socket_connect',
      // comment passer 2 actions dans le même v-on ??
    ]),
  },
};
</script>
