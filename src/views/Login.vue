<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>Login</h1>

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

        <v-alert type="error" :value="loginError">
          {{loginError}}
        </v-alert>

        <v-btn color="green" dark @click="login">
          <v-icon class="mr-2">fingerprint</v-icon>
          Login
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from 'axios';
// import HTTP from '../http';
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
    ]),
    ...mapActions('authentication', [
      'login',
    ]),
  },
  // data() {
  //   return {
  //     email: '',
  //     password: '',
  //   };
  // },
  // methods: {
  //   login() {
  //     const body = {
  //       email: this.email,
  //       password: this.password,
  //     };

  //     return HTTP().post('/users/login', body)
  //       .then((res) => {
  //         console.log(res);
  //         console.log(res.data.isAuthenticated);
  //         // if (res.status === 200) {
  //         //   localStorage.setItem('token', res.data.token);
  //         //   console.log(res.data.token);
  //         // }
  //         this.$router.push('/');
  //         // window.location.reload();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   },
  // },
};
</script>
