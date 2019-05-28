<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>Login</h1>

        <v-text-field
          v-model="email"
          label="email"
          placeholder="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Password"
          type="password"
          autocomplete="new-password"
        ></v-text-field>

        <v-btn color="green" dark @click="login()">
          <v-icon class="mr-2">fingerprint</v-icon>
          Login
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from 'axios';
import HTTP from '../http';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const body = {
        email: this.email,
        password: this.password,
      };

      return HTTP().post('/api/login', body)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            console.log(res.data.token);
          }
          this.$router.push('/');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
